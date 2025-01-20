from . import views
from django.urls import path

urlpatterns = [
    path('validate/',views.validate),
    path("getAllSubjects/",views.getAllSubjects),
    path('GetAllQuestions/<subject>',views.GetAllQuestions),
    path("viewQuestion/<qno>/<subject>",views.viewQuestion),
    path("updateQuestion/",views.updateQuestion),
    path("deleteQuestion/<qno>/<subject>",views.deleteQuestion),
    path("addQuestion/",views.addQuestion),
    path("validateAdmin/",views.validateAdmin),
    path("getResults/<subject>",views.getResults),
    path("saveResult/",views.saveResult),
    



    
]