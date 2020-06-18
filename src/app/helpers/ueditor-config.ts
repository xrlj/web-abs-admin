// 富文本框编辑器配置信息
import {environment} from '../../environments/environment';
import {ApiPath} from '../api-path';

export class UEditorConfig {
  wordCount = true; // 文字计数
  initialFrameHeight = 200; // 设置高度
  initialFrameWidth = '100%'; // 设置宽度
  autoHeightEnabled: false;
  enableAutoSave = false;
  /* 上传图片配置项 */
  imageActionName = 'uploadimage' /* 执行上传图片的action名称 */;
  imageFieldName = 'upfile' /* 提交的图片表单名称 */;
  imageMaxSize = 2048000 /* 上传大小限制，单位B */;
  imageAllowFiles = [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.bmp',
  ] /* 上传图片格式显示 */;
  imageCompressEnable = true /* 是否压缩图片,默认是true */;
  imageCompressBorder = 1600 /* 图片压缩最长边限制 */;
  imageInsertAlign = 'none' /* 插入的图片浮动方式 */;
  imageUrlPrefix = ''; /* 图片访问路径前缀,可配置您的文件访问地址 */
  imagePathFormat = '' /* 上传保存路径,可以自定义保存路径和文件名格式，不使用本地保存，可不配置 */;
  replace = '';
  serverUrl = 'http://192.168.0.3:9020'.concat('/sysFiles' + '/ueditorUploadImg'); // 服务器统一请求接口路径

  /*视频 start*/
  videoActionName = 'A'; // 执行上传视频的action名称
  videoFieldName  = 'B'; // 提交的视频表单名称
  videoPathFormat  = 'C'; // [默认值："/ueditor/php/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}"] //上传保存路径,可以自定义保存路径和文件名格式，上传路径配置
  videoUrlPrefix  = 'D'; // 视频访问路径前缀
  videoMaxSize  = 'E'; // {Number} [默认值：102400000] //上传大小限制，单位B，默认100MB，注意修改服务器的大小限制
  videoAllowFiles = ['.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg', '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid', '.wmv'];  // 上传视频格式显示
  /*视频 end*/

  toolbars = [
    [
      'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|',
      'fontfamily', 'fontsize', 'customstyle', 'paragraph', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
      'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
      'fullscreen', 'source', '|', 'undo', 'redo', '|',
      'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
      'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
      'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'insertframe', 'insertcode', 'template', '|',
      'horizontal', 'date', 'time', 'spechars', 'wordimage', '|',
      'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
      'preview', 'searchreplace'
    ]
  ];
}
