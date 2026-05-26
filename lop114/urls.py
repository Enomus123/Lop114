"""
URL configuration for lop114 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home import views as home
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home.get_home, name='home'),
    path('luu-but/', home.luu_but_view, name='luu_but_page'),
    path('xoa-luu-but/<int:id>/', home.xoa_luu_but, name='xoa_luu_but'),
    path('sua-luu-but/<int:id>/', home.sua_luu_but, name='sua_luu_but'),
    path('tang-luot-tim/', home.tang_luot_tim, name='tang_luot_tim'),
]
