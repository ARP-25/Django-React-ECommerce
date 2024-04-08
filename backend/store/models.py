from django.db import models
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify

from vendor.models import Vendor
from userauths.models import User, Profile



class Category(models.Model):
    title = models.CharField(max_length=100, help_text='Category title', null=True, blank=True)
    image = models.FileField(upload_to='category/', null=True, blank=True, default="category/default.jpg")
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['title']

class Product(models.Model):
    title = models.CharField(max_length=100, help_text='Category title', null=True, blank=True)
    image = models.FileField(upload_to='products/', null=True, blank=True, default="image/product.jpg")
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    shipping_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    stock_qty = models.PositiveIntegerField(default=1)
    in_stock = models.BooleanField(default=True)

    STATUS = (
        ('draft', 'Draft'),
        ('disabled', 'Disabled'),
        ('in_review', 'In Review'),
        ('disabled', 'Disabled'),
        ('published', 'Published'),
    )
    status = models.CharField(max_length=100, choices=STATUS, default='draft')

    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    pid = ShortUUIDField(unique=True, length=10, prefix="P", alphabet="abcdefg123456789", null=True, blank=True)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-date']

    def save(self, *args, **kwargs):
        if self.slug == None or self.slug =='': 
            self.slug = slugify(self.title)
            super(Product, self).save(*args, **kwargs)


class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.FileField(upload_to='gallery/', default='gallery.jpg', null=True, blank=True)
    active = models.BooleanField(default=True)
    gid = ShortUUIDField(unique=True, length=10, prefix="G", alphabet="abcdefg123456789")

    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name = 'Gallery'
        verbose_name_plural = 'Galleries'


class Specification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000, help_text='Specification title', null=True, blank=True)
    content = models.TextField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.title
    

class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000, help_text='Specification title', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)

    def __str__(self):
        return self.name
    

class Color(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000, help_text='Specification title', null=True, blank=True)
    color_code = models.CharField(max_length=100, help_text='Color code', null=True, blank=True)

    def __str__(self):
        return self.name




