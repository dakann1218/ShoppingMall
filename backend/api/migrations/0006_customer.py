# Generated by Django 3.1.4 on 2021-01-06 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_orderlist'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_id', models.TextField()),
                ('customer_pw', models.TextField()),
                ('customer_email', models.TextField()),
                ('customer_address', models.TextField()),
            ],
        ),
    ]
