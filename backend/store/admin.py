from django.contrib import admin
from .models import Category, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem


class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 1
class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 1

class SizeInline(admin.TabularInline):
    model = Size
    extra = 1

class ColorInline(admin.TabularInline):
    model = Color
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'category', 'stock_qty', 'in_stock', 'shipping_amount', 'vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline]


admin.site.register(Category)
admin.site.register(Product, ProductAdmin)

admin.site.register(Cart)
admin.site.register(CartOrder)
admin.site.register(CartOrderItem)
