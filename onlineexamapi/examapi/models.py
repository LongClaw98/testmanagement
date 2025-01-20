from django.db import models

# Create your models here.

class Result(models.Model):
  username=models.CharField(max_length=20,default='',primary_key=True)
  subject=models.CharField(max_length=20,default="null")
  score=models.IntegerField()

  def __str__(self):
    return "{},{},{}".format(self.username,self.subject,self.score)

  class Meta:
    db_table = "result" 

class Admin(models.Model):
  username=models.CharField(max_length=40,default='',primary_key=True)
  password=models.CharField(max_length=40,default='')

  def __str__(self):
    return '{},{}}'.format(self.usename,self.password)
  
  class Meta:
    db_table = "admin"








class Users(models.Model):
    
    username=models.CharField(max_length=40,primary_key=True)
    password=models.CharField(max_length=40)
    mobno=models.IntegerField()
    emailid=models.CharField(max_length=100)

    def __str__(self):
      return f"{self.username},{self.password},{self.mobno},{self.emailid}"

    class Meta:
      db_table="users"

class Question(models.Model):
   
   qno = models.IntegerField(default=0,primary_key=True)
   qtext = models.CharField(max_length=50,default="null")
   answer = models.CharField(max_length=50,default='null')
   op1 = models.CharField(max_length=50,default='null')
   op2 = models.CharField(max_length=50,default='null')
   op3 = models.CharField(max_length=50,default='null')
   op4 = models.CharField(max_length=50,default='null')
   subject = models.CharField(max_length=50,default='null')
   
   def __str__(self):
    return "{},{},{},{},{},{},{},{}".format(self.qno,self.qtext,self.answer,self.op1,self.op2,self.op3,self.op4,self.subject)
    # return {self.qno},{self.qtext},{self.answer},{self.op1},{self.op2},{self.op3},{self.op4},{self.subject}
   
   class Meta:
    db_table="question"

