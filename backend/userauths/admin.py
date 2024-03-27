from django.contrib import admin
from userauths.models import Profile, User





class UserAdmin(admin.ModelAdmin):
    list_display = ['email','full_name', 'phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user','full_name', 'country', 'city', 'state']
    #list_editable = ['country', 'city', 'state']
    search_fields = ['full_name']
    list_filter = ['date']



admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)



