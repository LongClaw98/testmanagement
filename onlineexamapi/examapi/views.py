from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from .models import Users , Question ,Admin,Result
from django.db import connection
from  .serilizers import QuestionSerilizer, ResultSerilizer
# Create your views here.


@api_view(['POST'])
def validate(request):
    userfromclient=request.data

    userfromdb=Users.objects.get(username = userfromclient['username'])
    
    if userfromclient["username"]==userfromdb.username and userfromclient["password"]==userfromdb.password:
        return Response(True)
    
    else:
        return Response(False)
    print(sent)


@api_view(['GET'])
def GetAllQuestions(request,subject):
    print()
    allquestions=Question.objects.filter(subject=subject)
    print()
    return Response(QuestionSerilizer(allquestions,many=True).data)


@api_view(['GET'])
def getAllSubjects(request):
    # allque=Question.objects.all()
    # allsubs=map(lambda question:question.subject,allque)
    # return Response(set(allsubs))
    allsub=Question.objects.all().values("subject")

    subs = [] 
    for sub in allsub:
        for i in sub.values():
            subs.append(i)  
    return Response(set(subs))

@api_view(['GET'])
def viewQuestion(request,qno,subject):
   
    question=Question.objects.get(qno=qno, subject=subject)

    return Response(QuestionSerilizer(question).data)


@api_view(['POST'])
def addQuestion(request):
    question = request.data

    Question.objects.create(qno=question["qno"],subject=question["subject"],qtext=question["qtext"],answer=question["answer"],op1=question['op1'],op2=question['op2'],op3=question['op3'],op4=question['op4'])

    return Response(True)

@api_view(['PUT'])    
def updateQuestion(request):
    question=Question.objects.filter(qno=request.data['qno'],subject=request.data['subject'])

    question.update(qtext=request.data['qtext'],answer=request.data['answer'],op1=request.data['op1'],op2=request.data['op2'],op3=request.data['op3'],op4=request.data['op4'])
    print(connection.queries)

    return Response(True)

@api_view(['DELETE'])    
def deleteQuestion(request,qno,subject):
    queryset=Question.objects.filter(qno=qno,subject=subject)

    queryset.delete()
    print(connection.queries)

    return Response(True)

@api_view(['POST'])
def validateAdmin(request):
    admintobevalidated=request.data
    adminfromdb=Admin.objects.get(username=admintobevalidated['username'])

    if (admintobevalidated['username']==adminfromdb.username and admintobevalidated["password"]==adminfromdb.password):
        return Response(True)
    else:
        return Response(False)
    
@api_view(["GET"]) 
def getResults(request,subject):
    questions=Result.objects.filter(subject=subject)
    return Response(ResultSerilizer(questions,many=True).data)

@api_view(['POST'])
def saveResult(request):
    result=request.data
    Result.objects.create(username=result["username"],subject=result["subject"],score=result["score"])
    print("saved")
    return Response(True)

