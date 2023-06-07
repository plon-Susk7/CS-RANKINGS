from django.http import HttpResponse

def home_page(request):
    print("Home page req")
    return HttpResponse("This is home page")