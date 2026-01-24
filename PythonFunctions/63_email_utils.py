"""Email utilities"""
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def create_email(sender: str, recipient: str, subject: str, body: str) -> MIMEMultipart:
    """Create email message"""
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    return msg


def create_html_email(sender: str, recipient: str, subject: str, html: str) -> MIMEMultipart:
    """Create HTML email"""
    msg = MIMEMultipart('alternative')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(html, 'html'))
    return msg
