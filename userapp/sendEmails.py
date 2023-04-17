from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
import config
from userapp.models import Notifications

email_from = config.EMAILSENDER
webtrader = "http://my.seekstack.net:8000"

def saveNewAdminNotification(user_email, user_name):
    all_admins = User.objects.filter(is_superuser=True)

    for admin in all_admins:
        new_notification = Notifications.objects.create(
            user=admin,
            notification_title="A new user has been added",
            notification_description=f"""
                User Name: {user_name},
                User Email: {user_email}
            """
        )
        new_notification.save()


def sendAdminEmailNewUser(user_email, user_name, admin_email, first_name, last_name, phone, country, referral):

    subject = 'New User Register'
    message = f"""
        Hi Admin, A new user has been register in the website. \n

        User Info:
        User Name: {user_name}
        User Email: {user_email}
        First Name: {first_name}
        Last Name: {last_name}
        Phone: {phone}
        Country: {country}
        Referral: {referral}

        Thanks
    """
    html_message = f"""
        Hi A new user has been register in the website. <br><br>
    
        User Info: <br>
        <strong>User Name</strong>: {user_name} <br>
        <strong>User Email</strong>: {user_email} <br>
        <strong>First Name</strong>: {first_name} <br>
        <strong>Last Name</strong>: {last_name} <br>
        <strong>Phone</strong>: {phone} <br>
        <strong>Country</strong>: {country} <br>
        <strong>Referral</strong>: {referral} <br>

        <br>
        Thanks
        <br>
    """

    msg = EmailMultiAlternatives(subject, message, email_from, admin_email)
    msg.attach_alternative(html_message, "text/html")
    msg.send()

def sendNewUserEmail(first_name, user_email, user_name, user_password, verification_code):

    subject = 'Welcome to the Webtrader'
    message = f"""
        Hi {first_name}, we welcome you to the Webtrader. \n

        Below is your login details below
        user name: {user_name}
        password: {user_password}
        login: {webtrader}/login

        Before login you have to verify your email by clicking on this link: 
        {webtrader}/verify-account/{verification_code}
    """
    html_message = f"""
        Hi <strong>{first_name}</strong>,<br> we welcome you to the Webtrader. <br><br>
    
        Below is your login details <br>
        <strong>user name</strong>: {user_name} <br>
        <strong>password</strong>: {user_password} <br>
        <strong><a href="{webtrader}/login" target="blank" style="color: #6a008a"> Login </a></strong> <br>

        <br>
        <h5> Before login you have to verify your email by clicking on this link: </h5>
        <a href="{webtrader}/verify-account/{verification_code}" target="blank" style="color: #6a008a">Verify Account</a>
        <br> {webtrader}/verify-account/{verification_code}
        <br><br>

        Thank you for joining us
        <br>
    """

    recipient_list = [user_email,]
    # send_mail( subject, message, email_from, recipient_list )
    msg = EmailMultiAlternatives(subject, message, email_from, recipient_list)
    msg.attach_alternative(html_message, "text/html")
    msg.send()

def sendPasswordResetEmail(first_name, user_email, user_name, user_password):

    subject = 'Login Details Reset Successfully'
    message = f"""
        Hi {first_name}, \n

        Below is your new login details below
        user name: {user_name}
        password: {user_password}
        login: {webtrader}/login
    """
    html_message = f"""
        Hi <strong>{first_name}</strong>,<br><br>
    
        Below is your new login details <br>
        <strong>user name</strong>: {user_name} <br>
        <strong>password</strong>: {user_password} <br>
        <strong><a href="{webtrader}/login" target="blank" style="color: #6a008a"> Login </a></strong> <br>

        Thank you for staying with us
        <br>
    """

    recipient_list = [user_email,]
    # send_mail( subject, message, email_from, recipient_list )
    msg = EmailMultiAlternatives(subject, message, email_from, recipient_list)
    msg.attach_alternative(html_message, "text/html")
    msg.send()