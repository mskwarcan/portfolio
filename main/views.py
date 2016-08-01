from django.shortcuts import render
from .models import Portfolio

# Create your views here.
def index(request):
    portfolio_projects = Portfolio.objects.all()
    return render(request, 'index.html', portfolio_projects)