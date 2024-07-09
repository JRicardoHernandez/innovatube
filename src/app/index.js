function onClickBtn(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Leb4gsqAAAAALccRM86Qy0frmwTydWdF_qYnTX3', {action: 'LOGIN'});
      console.log(token);
    });
}