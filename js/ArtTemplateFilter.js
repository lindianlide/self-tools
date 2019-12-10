import Runtime from 'art-template/lib/runtime';

//art-template模板公用方法
Runtime.formatProductImg = function(sugGoodsCode, vendorId){

  if(sugGoodsCode && vendorId){
    return $.base.getProductImg(sugGoodsCode, vendorId, 400) + ($.isWebp ? '?from=mobile' : '')
  }
  return ''
}


Runtime.formatBrandImg = function(timestamp){
  if(timestamp){
    let date = new Date(Number(timestamp))
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;

    return `${year}/${month}/${day}`
  }
  return ''
}
