from rest_framework import serializers
from .models import Category, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Wishlist, Notification, Coupon
from vendor.models import Vendor



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = '__all__'


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class ProductReadSerializer(serializers.ModelSerializer):
    # Nested Serializer
    gallery = GallerySerializer(many=True, read_only=True)
    color = ColorSerializer(many=True, read_only=True)
    specification = SpecificationSerializer(many=True, read_only=True)
    size = SizeSerializer(many=True, read_only=True)
    vendor = VendorSerializer(read_only=True)
    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'image',
            'description',
            'category',
            'price',
            'old_price',
            'shipping_amount',
            'stock_qty',
            'in_stock',
            'status',
            'featured',
            'views',
            'rating',
            'vendor',
            'pid',
            'slug',
            'date',
            'gallery',
            'color',
            'specification',
            'size',
            'product_rating',
            'rating_count',
        ]
        depth = 3

class ProductWriteSerializer(serializers.ModelSerializer):
    # Nested Serializer
    gallery = GallerySerializer(many=True, read_only=True)
    color = ColorSerializer(many=True, read_only=True)
    specification = SpecificationSerializer(many=True, read_only=True)
    size = SizeSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'image',
            'description',
            'category',
            'price',
            'old_price',
            'shipping_amount',
            'stock_qty',
            'in_stock',
            'status',
            'featured',
            'views',
            'rating',
            'vendor',
            'pid',
            'slug',
            'date',
            'gallery',
            'color',
            'specification',
            'size',
            'product_rating',
            'rating_count',
        ]


    

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CartSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class CartOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrder
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CartOrderSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderItem
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CartOrderItemSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class ProductFaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFaq
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ProductFaqSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ReviewSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(WishlistSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CouponSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = kwargs.get('context', {}).get('request')
        if request.METHOD == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3