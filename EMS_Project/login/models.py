from email.policy import default
from pickle import FALSE
from tkinter import CASCADE
from django.db import models
from datetime import date
from django.core.validators import RegexValidator

# Create your models here.
class employee(models.Model):
    Employee_id = models.AutoField(primary_key=True)
    Password=models.CharField(max_length=100, blank=False)
    First_Name=models.CharField(max_length=150,blank=False)
    Last_Name=models.CharField(max_length=15,blank=False)
    Email_Id=models.CharField(max_length=50,blank=False, default='',unique=True)
    Phone_Number=models.CharField( max_length=10, blank=False, validators=[RegexValidator(r'^\d{1,10}$')])
    Emergency_Contact_Name=models.CharField(max_length=15,blank=False)
    Emergency_Contact_Number=models.CharField( max_length=10, blank=False, validators=[RegexValidator(r'^\d{1,10}$')])
    Gender=models.CharField(max_length=1,blank=False)
    Marital_Status = models.CharField(max_length=20,null=True)
    Alternate_Email_Id=models.CharField(max_length=50,null=True)
    IsOwner=models.BooleanField(max_length=3,default=False)
    Status_In_Company=models.CharField(max_length=9,blank=False,default='Active')
    class Meta:
        db_table='employee'
    def get_name(self):
        return self.First_Name + ' belongs to ' + self.Last_Name + ' family.'

    def create_name(self):
        return self.First_Name

class work_details(models.Model):
    Employee = models.ForeignKey(employee, to_field= 'Employee_id', primary_key=True, default=None, on_delete=models.CASCADE)
    Designation	= models.CharField(max_length=20, default='')            
    Date_of_Joining	= models.DateField()           
    CTC	= models.DecimalField(max_digits=7, decimal_places=2)            
    Department	= models.CharField(max_length=20)           
    Employee_Status	= models.CharField(max_length=20)             
    Reporting_To = models.CharField(max_length=20)
    Employee_Type	= models.CharField(max_length=20)             
    Work_Phone   = models.CharField( max_length=10, blank=False, validators=[RegexValidator(r'^\d{1,10}$')])
    class Meta:
        db_table='work_details'
    def get_Designation(self):   
        return self.Designation
    def get_Reporting_To(self):   
        return self.Reporting_To

class attendance_status(models.Model):
    Employee = models.ForeignKey(employee, to_field= 'Employee_id', default=None, on_delete=models.CASCADE)
    Punch_In = models.TimeField()
    Punch_Out = models.TimeField(null=True)
    Date_col = models.DateField()
    Day_col	= models.CharField(max_length=9)
    Working_hours = models.TimeField(null=True)
    Work_Notes = models.CharField(null=True, max_length=1000)
    class Meta:
        db_table='attendance_status'
    def get_Work_Notes(self):
        return self.Work_Notes
    def get_Day_col(self):
        return self.Day_col

class leave_details(models.Model):
    Employee = models.ForeignKey(employee, to_field= 'Employee_id', default=None, on_delete=models.CASCADE)
    Leave_Reason=models.CharField(max_length=1000, blank= False)
    Leave_Type=models.CharField(max_length=100, blank=False)
    From_Date=models.CharField(max_length=15, blank=False)
    To_Date=models.CharField(max_length=15,blank=False)
    Status=models.CharField(max_length=35, blank=False)
    class Meta:
        db_table='leave_details'

    def get_Leave_Reason(self): 
        return self.Leave_Reason

    def get_Leave_Type(self):
        return self.Leave_Type

class holidays_available(models.Model):
    Holiday_Date = models.DateField()
    Holiday_Reason = models.CharField(max_length=45)
    class Meta:
        db_table='holidays_available'

class leave_available(models.Model):
    Casual_Available = models.IntegerField(blank=False)
    Sick_Available = models.IntegerField(blank=False)
    Casual_Booked=models.IntegerField(default=0)
    Sick_Booked=models.IntegerField(default=0) 
    Employee = models.OneToOneField(employee, primary_key=True, default=None, on_delete=models.CASCADE)
    class Meta:
        db_table='leave_available'


class Paystubs_Services(models.Model):
    Basic_Salary = models.DecimalField(max_digits=7, decimal_places=2)
    Account_Number = models.IntegerField(blank=False)
    Bank_Name = models.CharField(blank=False,max_length=45)
    Institution_Code = models.CharField(blank=False,max_length=45)
    Month_Salary_Paid = models.CharField(blank=False,max_length=20)
    Tax_Applied = models.CharField(blank=False, default='13%',max_length=45)
    Employee = models.ForeignKey(employee, to_field= 'Employee_id', default=None, on_delete=models.CASCADE)
    class Meta:
        db_table='Paystubs_Services'