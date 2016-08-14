from django.conf.urls import include, url
from django.views.generic import TemplateView
from contact_form.views import ContactFormView
from .forms import ContactForm
from . import views

urlpatterns = [
    url(r'^$',views.index),
    url(r'^about/$',views.about),
    url(r'^contact/$',views.ContactView.as_view(), name='contact'),
    url(r'^get_project/(?P<id>\d+)$',views.get_project),
]