from django.test import TestCase
from login.models import employee, work_details, attendance_status, leave_details


class EmployeeTest(TestCase):

    def setUp(self):
        employee.objects.create(
            Employee_id = 4,
            Password='1234567890',
            First_Name='arshad',
            Last_Name='momin',
            Email_Id='abc@gmail.com',
            Phone_Number='9999999999',
            Emergency_Contact_Name='Aranjay',
            Emergency_Contact_Number='1111111111',
            Gender='M'
       )

        employee.objects.create(
            Employee_id = 2,
            Password='12222222222',
            First_Name='dhara',
            Last_Name='mehta',
            Email_Id='xyz@gmail.com',
            Phone_Number='9988899999',
            Emergency_Contact_Name='omkar',
            Emergency_Contact_Number='1112222111',
            Gender='F'
       )

    def test_employee(self):
        employee_arshad = employee.objects.get(First_Name='arshad')
        employee_dhara = employee.objects.get(First_Name='dhara')
        self.assertEqual(employee_arshad.get_name(), "arshad belongs to momin family.")
        self.assertEqual(employee_dhara.get_name(), "dhara belongs to mehta family.")
    
   

class TestModels(TestCase):
    def setUp(self):
        employee1 = employee.objects.create(
            Employee_id = 4,
            Password='1234567890',
            First_Name='arshad',
            Last_Name='momin',
            Email_Id='abc@gmail.com',
            Phone_Number='9999999999',
            Emergency_Contact_Name='Aranjay',
            Emergency_Contact_Number='1111111111',
            Gender='M'
       )
        work_details.objects.create(
            Employee = employee1,
            Designation = 'Supervisor',
            Date_of_Joining = '2021-03-23',
            CTC = '12000',
            Department = 'Electric',
            Employee_Status = 'Active',
            Reporting_To = 'Minesh',
            Employee_Type = 'Supervisor',
            Work_Phone = '1234567890'
        )

class TestModels(TestCase):
    def setUp(self):
        employee2 = employee.objects.create(
            Employee_id = 4,
            Password='1234567890',
            First_Name='arshad',
            Last_Name='momin',
            Email_Id='abc@gmail.com',
            Phone_Number='9999999999',
            Emergency_Contact_Name='Aranjay',
            Emergency_Contact_Number='1111111111',
            Gender='M'
       )
        attendance_status.objects.create(
            Employee = employee2,
            Punch_In = '10:10',
            Punch_Out = '11:10',
            Date_col = '2006-04-04',
            Day_col = 'Friday',
            Working_hours = '11',
            Work_Notes = 'Completed'
        )
        work_details.objects.create(
            Employee = employee2,
            Designation = 'Supervisor',
            Date_of_Joining = '2021-03-23',
            CTC = '12000',
            Department = 'Electric',
            Employee_Status = 'Active',
            Reporting_To = 'Minesh',
            Employee_Type = 'Supervisor',
            Work_Phone = '1234567890'
        )

    def test_Work_Notes(self):
        employee_c = attendance_status.objects.get(Work_Notes='Completed')
        self.assertEqual(employee_c.get_Work_Notes(), "Completed")

    def test_Day_col(self):
        employee_d = attendance_status.objects.get(Day_col='Friday')
        self.assertEqual(employee_d.get_Day_col(), "Friday")
    
    def test_Reporting_To(self):
        employee_e = work_details.objects.get(Reporting_To = 'Minesh')
        self.assertEqual(employee_e.get_Reporting_To(), "Minesh")

    def test_Designation(self):
        employee_a = work_details.objects.get(Designation='Supervisor')
        self.assertEqual(employee_a.get_Designation(), "Supervisor")

class TestModels1(TestCase):
    def setUp(self):
        employee3 = employee.objects.create(
            Employee_id = 1,
            Password='1234567890',
            First_Name='arshad',
            Last_Name='momin',
            Email_Id='abc@gmail.com',
            Phone_Number='9999999999',
            Emergency_Contact_Name='Aranjay',
            Emergency_Contact_Number='1111111111',
            Gender='M'
       )
        leave_details.objects.create(
            Employee = employee3,
            Leave_Reason = 'Fever',
            Leave_Type = 'Sick Leave',
            From_Date = '22-03-22',
            To_Date = '22-03-26',
            Status = 'approved'
        )
    
    def test_Leave_Reason(self):
        employee_f = leave_details.objects.get(Leave_Reason = 'Fever')
        self.assertEqual(employee_f.get_Leave_Reason(), "Fever")
    
    def test_Leave_Type(self):
        employee_g = leave_details.objects.get(Leave_Type = 'Sick Leave')
        self.assertEqual(employee_g.get_Leave_Type(), "Sick Leave")