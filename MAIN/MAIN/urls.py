from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', include('TODO.urls')),
]


'''

CONVENTIONS:
url names: 
    View Class Name 
    in small characters 
    separated by '_' 
    and url suffix at the end

'''