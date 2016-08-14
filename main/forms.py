from django import forms

class ContactForm(forms.Form):
    contact_name = forms.CharField(label="Name", required=True)
    contact_email = forms.EmailField(label="Email Address", required=True)
    content = forms.CharField(
        required=True,
        widget=forms.Textarea,
        label="Message"
    )
    
    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['contact_name'].label = "Name"
        self.fields['contact_email'].label = "Email Address"
        self.fields['content'].label = "Message"