@echo off

:: �ļ������ʽ������ANSI������������
:: echo�൱��print
:: �����"::"��ʾע��
:: ��ʱ�ػ�����:shutdown -f -s -t  ����
:: set /a��ʾ��������
:: %������%
:: set /p��ʾ��ͣ����ִ�У����û����룬userHour��ʾ������=�����ֵΪ��ʾ������

echo �������a:ȡ���ػ���y:�����ػ�
set /p cmd=�����룺
if %cmd%==a goto cancel

set /p userHour=������Сʱ��
set /a second = %userHour%*3600
echo "���Խ���%userHour%"Сʱ֮��ر�
shutdown -f -s -t %second%
goto end

:cancel
echo "�û�������a���Ѿ�ȡ��������"
shutdown -a

:end
exit
