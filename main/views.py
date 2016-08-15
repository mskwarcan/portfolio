from django.shortcuts import render
from .models import Project
from .models import Tag
from django.views.generic import FormView
from django.core.urlresolvers import reverse_lazy
from django.template.loader import get_template
from django.core.mail import EmailMessage, send_mail
from django.template import Context
from django.http import JsonResponse
from django.core import serializers
from .forms import ContactForm

# Create your views here.
def index(request):
    context = dict()
    context['projects'] = Project.objects.prefetch_related('image_set').prefetch_related('tag_set').order_by('?')
    context['tags'] = Tag.objects.all()
    return render(request, 'index.html', context)
    
def about(request):
    return render(request, 'about.html')
    
def get_project(request, id):
    project = Project.objects.get(id=id)
    return JsonResponse(project.as_json(), safe=False)
    
def success(request):
    return render(request, 'contact_form/contact_form_sent.html')

class ContactView(FormView):
    form_class = ContactForm
    success_url = 'success'
    template_name = 'contact_form/contact_form.html'

    def form_valid(self, form):
        contact_name = form.cleaned_data['contact_name']
        contact_email = form.cleaned_data['contact_email']
        form_content = form.cleaned_data['content']

        template = get_template('contact_form/contact_form.txt')
        context = Context({
            'contact_name': contact_name,
            'contact_email': contact_email,
            'form_content': form_content
        })
        content = template.render(context)

        send_mail('Contact Form Submission', content, 'contact@michaelskwarcan.com', ['mskwarcan@gmail.com'], fail_silently=False)
        
        return super(ContactView, self).form_valid(form)