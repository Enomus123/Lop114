from django.shortcuts import render

def get_home(request):
    return render(request, 'home/home.html')
def guestbook(request):
    return render(request, 'home/guestbook.html')
