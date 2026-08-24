"""
URL patterns for the core app.
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, DashboardView, LogoutView

urlpatterns = [
    # Auth endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Protected endpoints
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
