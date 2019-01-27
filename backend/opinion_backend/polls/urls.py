from django.urls import path, include
from polls import views

urlpatterns = [
    path('polls/', views.question_list),
    path('create_question/', views.create_question),
    path('create_choice/', views.create_choice),
    path('get_choices/<key>', views.get_choices),
    path('polls/<key>', views.question_detail),
    path('<key>/<c_id>/', views.vote),
]