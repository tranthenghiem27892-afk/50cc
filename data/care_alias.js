/* Bổ sung từ khoá zh/fil cho các chủ đề bảo dưỡng (chatbox) */
window.FAQ_ALIAS = window.FAQ_ALIAS || {};
(function () {
  var add = {
    c_daily: { zh: ['出行前检查', '日常检查'], fil: ['daily check', 'bago bumiyahe'] },
    c_oil: { zh: ['换机油', '机油多久', '机油更换'], fil: ['change oil', 'palit langis', 'kailan mag change oil'] },
    c_tire: { zh: ['胎压多少', '轮胎气压', '打气'], fil: ['tire pressure', 'hangin ng gulong', 'pahangin'] },
    c_brakepad: { zh: ['刹车片'], fil: ['brake pad', 'palitan ng preno'] },
    c_chainmaint: { zh: ['链条松紧', '链条油'], fil: ['chain tension', 'chain oil'] },
    c_battcare: { zh: ['电瓶充电', '电瓶保养'], fil: ['battery charge', 'i-charge battery'] },
    c_plug: { zh: ['火花塞'], fil: ['spark plug'] },
    c_filter: { zh: ['空气滤芯', '空滤'], fil: ['air filter'] },
    c_fuse: { zh: ['保险丝', '保险断了'], fil: ['fuse', 'pumutok fuse'] },
    c_bulb: { zh: ['换灯泡', '灯不亮'], fil: ['palit bulb', 'ilaw patay'] },
    c_wash: { zh: ['洗车', '怎么洗车'], fil: ['hugas motor', 'paano maghugas'] },
    c_store: { zh: ['长期停放', '很久不骑'], fil: ['storage', 'matagal hindi gamitin'] },
    c_breakin: { zh: ['磨合期', '新车磨合'], fil: ['break in', 'bagong motor'] },
    c_fueltype: { zh: ['加什么油', '汽油种类'], fil: ['gasolina', 'anong gas'] },
    c_downhill: { zh: ['下坡刹车'], fil: ['pababa', 'downhill'] },
    c_rust: { zh: ['生锈', '螺丝松'], fil: ['kalawang', 'maluwag turnilyo'] },
    c_diylimit: { zh: ['自己修', '自己换'], fil: ['DIY', 'sariling ayos'] },
    c_toolkit: { zh: ['带什么工具'], fil: ['mga dalhin', 'toolkit'] },
    c_tubeless: { zh: ['补胎胶', '临时补胎'], fil: ['tire sealant', 'tagpi gulong'] }
  };
  Object.keys(add).forEach(function (k) {
    window.FAQ_ALIAS[k] = window.FAQ_ALIAS[k] || {};
    window.FAQ_ALIAS[k].zh = add[k].zh;
    window.FAQ_ALIAS[k].fil = add[k].fil;
  });
})();
