from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from functools import partial
import smtplib
from turtle import update
from typing import List
from django.forms import PasswordInput, model_to_dict
from rest_framework.decorators import api_view
from login.models import leave_details
from login.models import Paystubs_Services, employee, leave_available,work_details, attendance_status, holidays_available
from login.serialization import SerializationClass, SerializationClass1, SerializationClass2, SerializationClassApplyLeave, SerializationClassHolidays, SerializationClassLeaveStatic, SerializationClassPayroll
from rest_framework import status
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from datetime import date,datetime, time
from datetime import timedelta


#Authenticate Employee ID,Password and login successfully
@api_view(['POST'])
def login_employee(request):
    if request.method == 'POST':
        Employee_id = request.data.get('Employee_id')
        Password = request.data.get('Password')
        empDetails = employee.objects.filter(Employee_id=Employee_id , Password=Password)
        if empDetails.exists():
            login_serializer1 = SerializationClass(empDetails[0])
            workDetails = work_details.objects.filter(Employee=empDetails[0].Employee_id)
            if workDetails.exists():
                work_serializer = SerializationClass1(workDetails[0])
                return JsonResponse([login_serializer1.data,work_serializer.data],safe=False, status=status.HTTP_200_OK)
        return JsonResponse({'Not found': "Must login!"}, status=status.HTTP_400_BAD_REQUEST)

#Add Employee to the organization Database and return personal and work details in response
@api_view(['POST'])
def add_employee(request): 
    if request.method == 'POST':
        whole_data = JSONParser().parse(request)
        login_data = whole_data["Employee_details"]
        work_data = whole_data["Work_details"]
        login_serializer = SerializationClass(data=login_data)
        if login_serializer.is_valid():
            login_serializer.save()
            empID = employee.objects.get(Employee_id = login_serializer.data["Employee_id"])
            pwd = login_serializer.data["Password"]
            first_name = login_serializer.data["First_Name"]
            email = login_serializer.data["Email_Id"]
            emp_id=empID.Employee_id
            work_serializer = work_details(Employee = empID,Designation = work_data['Designation'], Date_of_Joining = work_data['Date_of_Joining'], CTC = work_data['CTC'], Department = work_data['Department'], Employee_Status = work_data['Employee_Status'], Reporting_To = work_data['Reporting_To'], Employee_Type = work_data['Employee_Type'], Work_Phone = work_data['Work_Phone']  )
            work_serializer.save()
            MailSender(pwd,emp_id,first_name,email)
            return JsonResponse([login_serializer.data, model_to_dict(work_serializer)],safe=False, status=status.HTTP_201_CREATED) 
    return JsonResponse(login_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Employee will get automated mail once employer add him/her in the organization
def MailSender(pwd,empID,first_name,email):
    pwd = pwd
    emp_id=empID
    first_name = first_name
    email =email
    user = "omkartingre12345@gmail.com"
    password_file = open("D:/Uwaterloo/WINTER 22/ECE 651/Project/FrontEnd/EMS_Project/login/password.txt","r")
    password = password_file.read()
    # password = "ems@12345"
    to = email

    msg = MIMEMultipart()
    msg['From'] = user
    msg['To'] = to
    msg['Subject'] = "Welcome to EMS"
    body = "Hi %s,\n\nYour Emp_ID is : %s \n\n Your Temporary Password is : %s \n\nThis is AUTO generated mail. Don't reply to this mail.\n\nRegards,\nEmployee Management System" %(first_name,emp_id,pwd)
    msg.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP_SSL('smtp.gmail.com',465)
    server.ehlo()
    server.login(user,password)
    text = msg.as_string()
    server.sendmail(user,to,text)
    server.close()


#Update Default Password for that employee coming in request
@api_view(['PATCH'])
def changeEmpPwd(request, pk):
    try: 
        emp = employee.objects.get(pk=pk) 
        if request.method == 'PATCH':
            employee_serializer = SerializationClass(emp, data=request.data,partial=True) 
            if employee_serializer.is_valid(): 
                employee_serializer.save(update_fields=['Password']) 
                return JsonResponse(employee_serializer.data,status=status.HTTP_200_OK) 
            return JsonResponse(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except employee.DoesNotExist: 
        return JsonResponse({'message': 'The employee does not exist'}, status=status.HTTP_404_NOT_FOUND)


#Add Check In timings of the respective employee for that date and day
@api_view(['POST'])
def attendance_in(request):
    try: 
        if request.method == 'POST':
            attendance_data = JSONParser().parse(request)
            attendance_serializer = SerializationClass2(data=attendance_data, partial=True) 
            if attendance_serializer.is_valid():
                attendance_serializer.save()    
                return JsonResponse(attendance_serializer.data,status=status.HTTP_200_OK) 
            return JsonResponse(attendance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except attendance_status.DoesNotExist: 
        return JsonResponse({'message': 'Could not update the attendace table'}, status=status.HTTP_400_BAD_REQUEST)


#Add Check Out timings of the respective employee for that date and day only when that employee has done check in
@api_view(['PATCH'])
def attendance_out(request):
    try:
        attData = request.data
        att = attendance_status.objects.get(Employee=attData['Employee_id'],Date_col=attData['Date_col'])
        attData['Punch_Out'] =time(int(attData['Punch_Out'].split(":")[0]), int(attData['Punch_Out'].split(":")[1]))
        Punch_In = timedelta(hours=att.Punch_In.hour, minutes= att.Punch_In.minute) 
        Punch_Out = timedelta(hours=attData['Punch_Out'].hour, minutes= attData['Punch_Out'].minute) 
        Working_hours = Punch_Out - Punch_In
        attData['Working_hours'] = (datetime.min + Working_hours).time()

        attendance_serializer = SerializationClass2(att, data= attData, partial=True)
        if attendance_serializer.is_valid():
            attendance_serializer.save(update_fields=['Punch_Out', 'Working_hours'])
            return JsonResponse(model_to_dict(att),status=status.HTTP_200_OK)
        return JsonResponse(attendance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except attendance_status.DoesNotExist: 
        return JsonResponse({'message': 'Could not update the attendace table'}, status=status.HTTP_400_BAD_REQUEST)

#Get all Attendance Details for that respective employee
@api_view(['POST'])
def getAttendanceDetails(request):
    Employee_id = request.data.get('Employee_id')
    try:
        att = attendance_status.objects.filter(Employee_id=Employee_id).values()
        return JsonResponse(list(att), safe=False)
    except attendance_status.DoesNotExist:
        return JsonResponse({'message': 'The attendance details does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def updatePersonalDetails(request, pk):
    try:
        emp = employee.objects.get(pk=pk)
        if request.method == 'PUT':
            personal_data = JSONParser().parse(request)
            personal_serializer = SerializationClass(emp, data=personal_data)
            if personal_serializer.is_valid():
                personal_serializer.save()
                return JsonResponse(personal_serializer.data,status=status.HTTP_200_OK)
            return JsonResponse(personal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except employee.DoesNotExist:
        return JsonResponse({'message': 'The employee does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def updateWorkDetails(request, pk):
    try:
        wrk = work_details.objects.get(pk=pk)
        if request.method == 'PUT':
            work_data = JSONParser().parse(request)
            work_serializer = SerializationClass1(wrk, data=work_data)
            if work_serializer.is_valid():
                work_serializer.save()
                return JsonResponse(work_serializer.data,status=status.HTTP_200_OK)
            return JsonResponse(work_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except work_details.DoesNotExist:
        return JsonResponse({'message': 'The work details does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET','POST', 'DELETE'])
def add_holidays(request): 
    if request.method == 'POST':
        holiday_data = JSONParser().parse(request)
        holidays_serializer = SerializationClassHolidays(data=holiday_data)
        if holidays_serializer.is_valid():
            holidays_serializer.save()
            return JsonResponse(holidays_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(holidays_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        holidays_objects = holidays_available.objects.all()
        return JsonResponse(list(holidays_objects.values()),status=status.HTTP_200_OK,safe=False)


@api_view(['GET'])
def get_all_employees(request):
    if request.method == 'GET':
        employee_objects = employee.objects.all().values('Employee_id', 'First_Name', 'Last_Name', 'Email_Id', 'Phone_Number', 'Status_In_Company')
        return JsonResponse(list(employee_objects),status=status.HTTP_200_OK,safe=False)

@api_view(['GET'])
def get_all_employee_IDs(request):
    if request.method == 'GET':
        employee_ids = employee.objects.all().values('Employee_id')
        return JsonResponse(list(employee_ids),status=status.HTTP_200_OK,safe=False)

@api_view(['POST'])
def payroll_month(request): 
    if request.method == 'POST':
        payroll_data = JSONParser().parse(request)
        payroll_serializer = SerializationClassPayroll(data=payroll_data)
        if payroll_serializer.is_valid():
            payroll_serializer.save()
            return JsonResponse(payroll_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(payroll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def addStaticLeaveDetails(request): 
    if request.method == 'POST':
        availability_data = JSONParser().parse(request)
        staticleave_serializer = SerializationClassLeaveStatic(data=availability_data)
        if staticleave_serializer.is_valid():
            staticleave_serializer.save()
            return JsonResponse(staticleave_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(staticleave_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def saveLeaveDetails(request): 
    if request.method == 'POST':
        leave_data = JSONParser().parse(request)
        Employee_Id = leave_data["Employee"]
        From_Date = leave_data["From_Date"]
        To_Date = leave_data["To_Date"]
        Leave_Type = leave_data["Leave_Type"]
        count_leave = (datetime.strptime(leave_data["To_Date"], '%y-%m-%d') - datetime.strptime(leave_data["From_Date"], '%y-%m-%d')).days
        try:
            emp=leave_available.objects.get(Employee=employee.objects.get(pk = Employee_Id))
            if Leave_Type == "Sick Leave" :
                emp.Sick_Booked += count_leave
                emp.Sick_Available -= count_leave
                emp.save()
            else:
                emp.Casual_Booked += count_leave
                emp.Casual_Available -= count_leave
                emp.save()
        except leave_available.DoesNotExist:
            return JsonResponse({'message': 'The leave available details do not exist'}, status=status.HTTP_404_NOT_FOUND)
        leave_serializer = SerializationClassApplyLeave(data=leave_data)
        if leave_serializer.is_valid():
            leave_serializer.save()
        return JsonResponse([leave_serializer.data, model_to_dict(emp)],safe=False, status=status.HTTP_201_CREATED)
    return JsonResponse(leave_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def getLeaveDetails(request):
    Employee_id = request.data.get('Employee_id')
    try:
        leave = leave_available.objects.filter(Employee_id=Employee_id).values()
        return JsonResponse(list(leave), safe=False)
    except leave_available.DoesNotExist:
        return JsonResponse({'message': 'The details does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def getPayrollDetails(request):
    Employee_id = request.data.get('Employee_id')
    try:
        payroll = Paystubs_Services.objects.filter(Employee_id=Employee_id).values()
        return JsonResponse(list(payroll), safe=False)
    except Paystubs_Services.DoesNotExist:
        return JsonResponse({'message': 'The details does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def getAppliedLeaveDetails(request):
    Employee_id = request.data.get('Employee_id')
    try:
        appliedleave_details = leave_details.objects.filter(Employee_id=Employee_id).values()
        return JsonResponse(list(appliedleave_details), safe=False)
    except leave_details.DoesNotExist:
        return JsonResponse({'message': 'The details does not exist'}, status=status.HTTP_404_NOT_FOUND)