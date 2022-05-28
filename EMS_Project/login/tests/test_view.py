import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

client = Client()


class CreateNewUserTest(TestCase):
    """ Test module for adding a new employee """

    def setUp(self):

        self.valid_payload = {
            "Employee_details": {
                "Password": "qwerty123",
                "First_Name": "Dhara",
                "Last_Name": "Mehta",
                "Email_Id": "dhara012@gmail.com",
                "Phone_Number": "0987654321",
                "Emergency_Contact_Name": "Dhara",
                "Emergency_Contact_Number": "9874561230",
                "Gender": "F"
            },
            "Work_details": {
                "Designation": "Supervisor",
                "Date_of_Joining": "2021-03-23",
                "CTC": "12000",
                "Department": "ElectricProd",
                "Employee_Status": "Active",
                "Reporting_To": "Minesh",
                "Employee_Type": "Supervisor",
                "Work_Phone": "9874561231"
            }
        }

        self.invalid_payload = {
            "Employee_details": {
                "Password": "",
                "First_Name": "Dhara",
                "Last_Name": "Mehta",
                "Email_Id": "",
                "Phone_Number": "0987654321",
                "Emergency_Contact_Name": "Dhara",
                "Emergency_Contact_Number": "9874561230",
                "Gender": "F"
            },
            "Work_details": {
                "Designation": "Supervisor",
                "Date_of_Joining": "2021-03-23",
                "CTC": "12000",
                "Department": "ElectricProd",
                "Employee_Status": "Active",
                "Reporting_To": "Minesh",
                "Employee_Type": "Supervisor",
                "Work_Phone": "9874561231"
            }
        }

    def test_add_valid_user(self):
        response = client.post(
            reverse('add'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_invalid_user(self):
        response = client.post(
            reverse('add'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_all_employees(self):
        client = Client()
        response = client.get(reverse('get_all_employees'))
        self.assertEquals(response.status_code, 200)

    def test_get_all_employeeIDs(self):
        client = Client()
        response = client.get(reverse('get_all_employee_IDs'))
        self.assertEquals(response.status_code, 200)


class CreateNewAttendanceTest(TestCase):
   """Test module for attendance"""

   def setUp(self):
    self.valid_payload_att_in = {
        "Employee": "3",
        "Punch_In": "01:00",
        "Date_col": "2022-03-22",
        "Day_col": "Wednesday"
    }
    self.invalid_payload_att_in = {
        "Employee": "",
        "Punch_In": "01:00",
        "Date_col": "2022-03-22",
        "Day_col": "Wednesday"
    }
    self.valid_payload_att_out = {
        "Employee_id" : "3",
        "Punch_Out" : "22:15",
        "Date_col" : "2022-03-22"
    }
    self.invalid_payload_att_out = {
        "Employee_id" : "",
        "Punch_Out" : "22:15",
        "Date_col" : "2022-03-22"
    }     
    self.valid_payload_att_detail = {
        "Employee_id" : "1"
    }     
    self.valid_payload_att_detail_invalid = {
        "Employee_id" : "4"
    }     

   def test_add_valid_att_in(self):
        response = client.post(
            reverse('in'),
            data=json.dumps(self.valid_payload_att_in),
            content_type='application/json'
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

   def test_add_invalid_att_in(self):
        response = client.post(
            reverse('in'),
            data=json.dumps(self.invalid_payload_att_in),
            content_type='application/json'
        )
        self.assertEqual(response.status_code,  status.HTTP_400_BAD_REQUEST)

   def test_add_valid_att_out(self):
        response = client.post(
            reverse('out'),
            data=json.dumps(self.valid_payload_att_out),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED | status.HTTP_400_BAD_REQUEST )

   def test_add_invalid_att_out(self):
        response = client.post(
            reverse('out'),
            data=json.dumps(self.invalid_payload_att_out),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED|status.HTTP_400_BAD_REQUEST)

        

   def test_get_all_attendance_valid(self):
        response = client.post(
            reverse('get'),
            data=json.dumps(self.valid_payload_att_detail),
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

   def test_get_all_attendance_invalid(self):
        response = client.post(
            reverse('get'),
            data=json.dumps(self.valid_payload_att_detail_invalid),
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

   def test_get_leave_details(self):
        response = client.post(
            reverse('getLeaveDetails'),
            data=json.dumps(self.valid_payload_att_detail_invalid),
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

   def test_get_payroll_details(self):
        response = client.post(
            reverse('getPayrollDetails'),
            data=json.dumps(self.valid_payload_att_detail_invalid),
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

class CreateNewLeaveTest(TestCase):
    def setUp(self):
        self.valid_leave = {
            "Casual_Available" : 10,
            "Sick_Available" : 15,
            "Employee" : "1"
        }
        self.invalid_leave = {
            "Casual_Available" : 10,
            "Sick_Available" : 15,
            "Employee" : "3"
        }
    def test_save_leave_details_valid(self):
        response = client.post(
            reverse('addStaticLeaveDetails'),
            data=json.dumps(self.valid_leave),
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 400)