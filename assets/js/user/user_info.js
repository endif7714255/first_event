$(function () {
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    }
  });
  initUserInfo();
  //   获取数据并为表单赋值
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取用户信息失败！");
        }
        form.val("formUserInfo", res.data);
      }
    });
  }
  //   实现表单重置效果
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  //   监听表单提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新用户信息失败！");
        }
        layui.layer.msg("更新用户信息成功！");
        window.parent.getUserInfo();
      }
    });
  });
});
