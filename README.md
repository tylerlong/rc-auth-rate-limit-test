# RingCentral Auth Rate Limit Test

By default, RingCentral allows you to make 5 auth API calls per minute.

But is this limit shared across all your extensions? Or is it per extension?


## Conclusion

As I tested, it is per extension. So each extension will be able to make 5 auth API calls per minute.
