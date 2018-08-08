function msgx()
{
     $("#msgx").css('display', 'none');
     $('#intoRegister').css('display','none');	
     $('#Modal_deal_chart').css('display','none');
     $( '#Modal_order03' ).css( 'display', 'none' );
}

function closePopup8Url( urlStr )  //關閉視窗

{
	$("#msgx").css('display', 'none');	
	
	directUrl( urlStr );
}
//info Obj INPUT status, title, mainTxt, subTxt
function msg(info)
{
	var colorTag = 'success_text';
	var iconTag = 'success_icon';
	var title = '系统讯息';
	if( info['title'] ) title = info['title'];
	if( info['status'] == 0 ) //0是失敗 1是成功
	{
		colorTag = 'failure_text';
		iconTag = 'failure_icon';
	}
	if( info['nextUrl'] )
	{
		$( '#popupClose' ).attr( 'onClick', "closePopup8Url( '"+info['nextUrl']+"' )" );
	}
	$("#title").html( title );
	$('#icon').attr('class',iconTag);
	$('#fontstyle').attr('class',colorTag);
	$("#text1").html( info['text1'] );
	$("#text2").html( info['text2'] );
	$("#msgx").css('display', 'block');
}
function regi_step1()
{
	//alert($('#name').val());
	if( $('#name').val()=='' || $('#name').val()==null)
	{
		var info = {'status':0, 'title':'', 'text1':'请选择帐号', 'text2':'' };
		msg(info);
	}
 	else if($('#loginPwd').val()=='' || $('#loginPwd').val().length <6
        || !$('#loginPwd').val().match(/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/g) )  
    {
        //alert('帐号密码请英数混合,至少6字元');
        var info = {'status':0, 'title':'', 'text1':'密码请英数混合,至少6字元', 'text2':'' };
        msg(info);
        $('#loginPwd').val('');
        $('#loginPwd2').val('');
    }
    else if($('#loginPwd2').val()=='' || $('#loginPwd').val() != $('#loginPwd2').val() )
    {
        //alert('请检查帐号密码是否正确');
        var info = {'status':0, 'title':'', 'text1':'请检查密码是否正确', 'text2':'' };
        msg(info);
        $('#loginPwd').val('');
        $('#loginPwd2').val('');
    }   
    else
    {
        $('#modal-signin').iziModal('close');
        $('#phone-verification').iziModal('open');
    } 
    
}
function register2()
{
	if($('#receivePwd').val()=='' || $('#receivePwd').val().length<6
		|| !$('#receivePwd').val().match(/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/g) )
			
	{
		//alert('提领密码请英数混合,至少6字元');
		var info = {'status':0, 'title':'', 'text1':'提领密码请英数混合,至少6字元', 'text2':'' };
		msg(info);
		$('#receivePwd').val('');
		$('#receivePwd2').val('');
	}
	else if($('#receivePwd2').val()=='' || $('#receivePwd').val()!= $('#receivePwd2').val() )
	{
		//alert('请检查提领密码是否正确');
		var info = {'status':0, 'title':'', 'text1':'请检查提领密码是否正确', 'text2':'' };
		msg(info);
		$('#receivePwd').val('');
		$('#receivePwd2').val('');
	}
	else if( $('#receivePwd').val()==$('#loginPwd').val() || $('#receivePwd2').val()==$('#loginPwd2').val() )
	{
		//alert('汇款户名请输入中文或英文字');
		var info = {'status':0, 'title':'', 'text1':'交易密码不可与密码相同', 'text2':'' };
		msg(info);
		$('#receivePwd').val('');
		$('#receivePwd2').val('');
	}
	else if( ckAccountName( $('#realname').val() ) != true )
	{
		var ckResult = ckAccountName( $('#realname').val() );
		if( ckResult == 'Contains numbers' ) msg( {'status':0, 'title':'', 'text1':'汇款户名不可含数字', 'text2':'' } );
		if( ckResult == 'Contains symbols' ) msg( {'status':0, 'title':'', 'text1':'汇款户名不可含符号', 'text2':'' } );
		return false;
	}
	else if ($('#mobile').val()==''|| $('#mobile').val().length<8 || isNaN($('#mobile').val()))
	{
		//alert('手机号码不足8位数字');
		$('#mobile').val('');
		var info = {'status':0, 'title':'', 'text1':'手机号码不足8位数字', 'text2':'' };
		msg(info);
	}
	else if($('#mobile_ans').val()<1)
	{
		$('#code4').val('');
		//alert($('#mobile_ans').val());
		var info = {'status':0, 'title':'', 'text1':'请完成手机验证', 'text2':'' };
		msg(info);
	}
	else
	{
		//alert($('#name').val());
		var change = new Object;
		change['userName'] =$('#name').val();
		change['nickName']='qqq';//$('#nickname').val();
		change['loginPwd']=$('#loginPwd').val();
		change['receivePwd']=$('#receivePwd').val();
		change['agent']=$('#agentid').val();
		change['pointQuestion']=2;//$('#question').val();
		change['pointAnswer']=1;//$('#ans').val();
		change['accountName']=$('#realname').val();
		change['mobile']=$('#area').val()+'-'+$('#mobile').val();
		change['email']='';
		change['birthday']='';
		change['skype']='';
		change['qq']='';
		change['wechat']='';
		change['inspection']=2;
		//change['tag']='memberadd';
		//alert(change['userName']+change['nickName']);
		adddd_e( change );
		return;
	}	
}
function adddd_e( change )
{
	Actions = jQuery.ajax({
		type: 'POST',
		url:  'ac_register_e.php',//新
		data: change,
		error: function(xhr)
		{
			//alert(1);
		},
		beforeSend:function(result)
		{
			loadingCtrl( 1 );
		},
		success: function(answer)
		{
			
			alert( answer );
			loadingCtrl( 0 );
			var res = JSON.parse( answer );
			alert (res.reCode+res.reMsg);
			if(res.reCode=="333")
			{
				/*var info = {'status':1, 'title':'注册成功', 'text1':'恭喜您已成為淘金網會員！',
							'text2':'通过手机，信箱验证即可开始使用！','nextUrl':'logout.php' };
				msg(info);*/
				$('#white-paper').show();
				$('#phone-verification').iziModal('close');
				$('#finish').iziModal('open');

			}
			else if(res.reCode!="333" && !empty(res.reCode))
			{
				alert('xxx');
				var info = {'status':0, 'title':"", 'text1':'['+res.reCode+']'+res.reMsg };
				msg(info);
			}
			else
			{
				
				var info = {'status':0, 'title':'注册失敗', 'text1':'抱歉，您尚未成为淘金网的会员',
							'text2':'请与您的代理联络或洽询客服','nextUrl':'./'+$('#agentid').val()};
				msg(info);
				
			}
		}
	});
}

//傳送驗證碼 開始
function mobilecheck() 
{
	$('#point_notice').css('block');
	$('#point_notice').html('※请于10分钟内完成验证码输入，如有疑问请洽客服。');

	if($('#mobile').val()=='' || $('#mobile').val().length<8 || isNaN($('#mobile').val()))
	{
		msg( {'status':0, 'title':'', 'text1':'手机号码不足8位数字', 'text2':'' } );
	}
	else
	{
		var change = new Object;
		change['mobile'] = $( '#area' ).val()+'-'+$( '#mobile' ).val();
		change['inspection']=1;
		Actions = jQuery.ajax({
				type: 'POST',
				url:  'ac_register_e.php',
				data:change,
				error: function(xhr)
				{
				},
				beforeSend:function(result)
				{
					loadingCtrl( 1 );	
				},
				success: function(answer)
				{
					loadingCtrl( 0 );
					//alert(answer);
					var res = JSON.parse( answer );
					if( res.reCode == "000" )
					{
						//send_code();//ac_regist.php已同時處理門號重複檢驗, 簡訊碼發送
						
						$( "#mobile" ).attr("readonly","readonly");//attr更改狀態
						$( '#send_code' ).css( 'display', 'none' );
						msg( {'status':1, 'title':'', 'text1':'验证码发送', 'text2':res.reMsg } );
					}
					else if( res.reCode == "666" )
					{
						msg( {'status':0, 'title':'', 'text1':'验证码发送', 'text2':'['+res.reCode+']'+res.reMsg } );
					}
					else
					{
						msg( {'status':0, 'title':'', 'text1':'验证码发送', 'text2':'['+res.reCode+']'+res.reMsg } );
					}
				}
			});
	}
}

//取消订单 开始
function delorder(betid)
{
	var change=new Object;
	change['bet_id']=betid;
	Actions = jQuery.ajax({
			type: 'POST',
			url:  'ac_orders.php',
			data: change,
			error: function(xhr)
			{
				alert('xxx');
			},
			beforeSend:function(result)
			{
				loadingCtrl( 1 );	
			},
			success: function(answer)
			{
				//alert(answer);
				loadingCtrl( 0 );
				
				var res=JSON.parse( answer );
				if(res.error_code==106)
				{
					var info = {'status':1, 'title':'', 'text1':'取消成功', 'text2':res.perform_result, 'nextUrl':'orders.php'};
					msg(info);
				}
				else
				{
					var info = {'status':0, 'title':'', 'text1':'取消失败', 'text2':res.perform_result, 'nextUrl':'orders.php'};
					msg(info);
				}
				reLoadUserInfo();	 			
			}
		});
}
//取消订单 结束