# Generated by Django 4.0.3 on 2022-05-22 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0013_alter_lab_labid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('labID', models.IntegerField(default=0)),
                ('pcNum', models.IntegerField(default=0)),
                ('type', models.CharField(max_length=10)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
    ]
