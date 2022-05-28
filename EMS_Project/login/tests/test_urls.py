from django.test import SimpleTestCase
from django.urls import reverse, resolve
from login.views import attendance_in, attendance_out, login_employee, add_employee, changeEmpPwd, getAttendanceDetails, updatePersonalDetails, updateWorkDetails, add_holidays
from login.views import get_all_employees, get_all_employee_IDs, payroll_month, addStaticLeaveDetails, saveLeaveDetails, getPayrollDetails

class TestUrls(SimpleTestCase):
    def test_login_employee_url_is_resolved(self):
        url = reverse('login_employee')
        self.assertEquals(resolve(url).func, login_employee)

    def test_add_url_is_resolved(self):
        url = reverse('add')
        self.assertEquals(resolve(url).func, add_employee)

    def test_change_url_is_resolved(self):
        url = reverse('change', args=['some-str'])
        self.assertEquals(resolve(url).func, changeEmpPwd)

    def test_in_url_is_resolved(self):
        url = reverse('in')
        self.assertEquals(resolve(url).func, attendance_in)

    def test_out_url_is_resolved(self):
        url = reverse('out')
        self.assertEquals(resolve(url).func, attendance_out)

    def test_get_url_is_resolved(self):
        url = reverse('get')
        self.assertEquals(resolve(url).func, getAttendanceDetails)

    def test_updatePersonalDetails_url_is_resolved(self):
        url = reverse('updatePersonalDetails', args=['some-str'])
        self.assertEquals(resolve(url).func, updatePersonalDetails)

    def test_updateWorkDetails_url_is_resolved(self):
        url = reverse('updateWorkDetails', args=['some-str'])
        self.assertEquals(resolve(url).func, updateWorkDetails)

    def test_add_holidays_url_is_resolved(self):
        url = reverse('add_holidays')
        self.assertEquals(resolve(url).func, add_holidays)
    
    def test_get_all_employees_holidays_url_is_resolved(self):
        url = reverse('get_all_employees')
        self.assertEquals(resolve(url).func, get_all_employees)

    def test_get_all_employee_IDs_holidays_url_is_resolved(self):
        url = reverse('get_all_employee_IDs')
        self.assertEquals(resolve(url).func,get_all_employee_IDs)

    def test_payroll_month_url_is_resolved(self):
        url = reverse('payroll_month')
        self.assertEquals(resolve(url).func,payroll_month)
  
    def test_addStaticLeaveDetails_url_is_resolved(self):
        url = reverse('addStaticLeaveDetails')
        self.assertEquals(resolve(url).func,addStaticLeaveDetails)
    
    def test_saveLeaveDetails_url_is_resolved(self):
        url = reverse('saveLeaveDetails')
        self.assertEquals(resolve(url).func,saveLeaveDetails)

    def test_getPayrollDetails_url_is_resolved(self):
        url = reverse('getPayrollDetails')
        self.assertEquals(resolve(url).func,getPayrollDetails)