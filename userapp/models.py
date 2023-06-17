from django.db import models
from django.contrib.auth.models import User

class CurrencyLists(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    symbol_type = models.CharField(max_length=10)
    decimal = models.IntegerField()
    ask = models.CharField(max_length=20)
    bid = models.CharField(max_length=20)
    open = models.CharField(max_length=20)
    high = models.CharField(max_length=20)
    low = models.CharField(max_length=20)
    close = models.CharField(max_length=20)
    spread = models.CharField(max_length=20)
    change = models.CharField(max_length=20)
    change_per = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    volume = models.CharField(max_length=20)

    class Meta:
        db_table = "currency_lists"

class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(null=False, max_length=22)
    country = models.CharField(null=False, max_length=3)
    account_type = models.CharField(null=False, max_length=50)
    referral_code = models.CharField(null=False, max_length=50)
    is_email_verified = models.BooleanField(default=False)
    verification_code = models.CharField(null=False, max_length=36, default="")
    trading_account_allowed = models.IntegerField(null=False, default=1)
    last_modified_by = models.CharField(null=False, max_length=10, default="none")

    class Meta:
        db_table = "auth_user_info"

class UserActiveSymbol(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    symbol_type = models.CharField(max_length=10, default="forex")
    chart_interval = models.CharField(max_length=10, default="5m")

    class Meta:
        db_table = "user_symbol"

class userTrades(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # trading_account = models.ForeignKey(tradingAccounts, on_delete=models.CASCADE)
    order_number = models.CharField(null=False, max_length=16)
    symbol = models.CharField(null=False, max_length=10)
    symbol_type = models.CharField(null=False, max_length=10)
    order_type = models.CharField(null=False, max_length=10)
    order_status = models.CharField(null=False, max_length=20, default="active")
    order_size = models.FloatField(null=False)
    open_price = models.FloatField(null=False)
    open_time = models.DateTimeField(auto_now_add=True)
    close_price = models.FloatField(null=False)
    close_time = models.DateTimeField(null=True)
    stop_loss = models.FloatField(null=False)
    take_profit = models.FloatField(null=False)
    profit = models.FloatField(null=False)
    swap  = models.FloatField(null=False)
    commission = models.FloatField(null=False)
    required_margin = models.FloatField(null=False)
    pip_value = models.FloatField(null=False)
    pip_count = models.IntegerField(null=False, default=0)

    class Meta:
        db_table = "user_trades"

class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(null=False, max_length=22)
    country = models.CharField(null=False, max_length=3)
    referral_code = models.CharField(null=False, max_length=50)
    is_email_verified = models.BooleanField(default=False)
    verification_code = models.CharField(null=False, max_length=36, default="")
    trading_account_allowed = models.IntegerField(null=False, default=1)
    last_modified_by = models.CharField(null=False, max_length=10, default="none")

    class Meta:
        db_table = "auth_user_info"

class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_title = models.CharField(null=False, max_length=100)
    notification_description = models.CharField(null=False, max_length=250)
    is_seen = models.BooleanField(null=False, default=False)

    class Meta:
        db_table = "admin_notification"