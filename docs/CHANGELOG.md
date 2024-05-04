# Improvement Plan for CreateOrderAPIView

## Validation and Serialization

-   [ ] Implement nested serialization for order items.
-   [ ] Ensure comprehensive data validation is managed by serializers.

## Transaction and Database Optimization

-   [ ] Wrap order processing in a transaction block.
-   [ ] Optimize data retrieval with `select_related` and `prefetch_related`.

## Error Handling and Logging

-   [ ] Enhance error messaging and use appropriate HTTP status codes.
-   [ ] Implement detailed logging for debugging and monitoring.

## Code Organization

-   [ ] Move business logic from views to serializers/model methods.
-   [ ] Update documentation and inline comments for clarity.

## Testing and Security

-   [ ] Develop comprehensive unit tests for the order process.
-   [ ] Review and reinforce security measures, especially around user data.

## Performance and Scalability

-   [ ] Conduct performance testing and address potential bottlenecks.
-   [ ] Evaluate and plan for scalability enhancements.

# Improvement Plan for PaymentSuccessAPIView

-   [ ] Modify confirmation Email Templates further to also handle Coupon Discount displaying

##

-   [ ] Remove items from cart when sucessfully checked out. Thas has to include: - Local Storage cartID removal. - And possibly create a field like "status" for the Cart model thats gets set to "Pending, Checked Out, Completed or Expired"

# Improvement Plan for ProfileAPIView

###

-   [ ] In customer/settings enable changing email address and mobile fields (need to implement custom logic in ProfileAPIView for this)
