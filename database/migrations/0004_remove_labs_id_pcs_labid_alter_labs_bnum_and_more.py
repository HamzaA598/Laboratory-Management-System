# Generated by Django 4.0.3 on 2022-05-20 14:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0003_labs_bnum'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='labs',
            name='id',
        ),
        migrations.AddField(
            model_name='pcs',
            name='labID',
            field=models.IntegerField()
        ),
        migrations.AlterField(
            model_name='labs',
            name='bNum',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='labs',
            name='labID',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
