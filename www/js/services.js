angular.module('starter.services',[])
.service('WC', function(){
    return {
        WC: function(){
            var Woocommerce = new WooCommerceAPI.WooCommerceAPI({
              url: 'http://wooshop.cloudaccess.host',
              consumerKey: 'ck_852752ef1f4379ea2e6eb97f4cf41ce8ba15319c',
              consumerSecret: 'cs_f2563413b66fce56a4a4e7f8b4e85af77f0c173a'
            });
            return Woocommerce;
        }
}});
