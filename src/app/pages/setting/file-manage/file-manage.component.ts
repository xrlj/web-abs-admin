import {Component, OnInit} from '@angular/core';
import {UploadChangeParam, UploadFile} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {HttpUtils} from '../../../helpers/http/HttpUtils';
import {Observable, Observer} from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.less']
})
export class FileManageComponent implements OnInit {

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  /*上传文件*/
  isShowUploadModal = false;
  uploadFileUrl = environment.apiUrl.concat(ApiPath.sysfilesystem.sysFiles.uploadFile);

  /*云储存配置*/
  isShowConfigModal = false;
  isConfigOkLoading = false;
  storageRadioValue = 'A';
  storageConfigForm: FormGroup;

  constructor(private uiHelper: UIHelper, private httpUtils: HttpUtils, private fb: FormBuilder) {
    // 云存储配置
    this.storageConfigForm = this.fb.group({
      url: [null, [Validators.required]],
      prefix: [null, null],
      accessKey: [null, [Validators.required]],
      secretKey: [null, [Validators.required]],
      spaceName: [null, [Validators.required]],
      endPoint: [null, [Validators.required]],
      accessKeyId: [null, [Validators.required]],
      accessKeySecret: [null, [Validators.required]],
      bucketName: [null, [Validators.required]],
      appId: [null, [Validators.required]],
      secretId: [null, [Validators.required]],
      tSecretKey: [null, [Validators.required]],
      tBucketName: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  /**
   * 云存储配置。
   */
  storageConfig() {
    this.isShowConfigModal = true;
  }

  /**
   * 上传文件。
   */
  uploadFile() {
    this.isShowUploadModal = true;
  }

  /**
   * 删除文件。
   */
  delFile() {

  }

  /**
   * 搜索文件列表。
   */
  search() {

  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  uploadModalCancel() {
    this.isShowUploadModal = false;
  }

  uploadFileData = () => {
    const data = {tag: 'admin', description: '总后台上传文件'};
    return data;
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      // 限制文件类型
      /*const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }*/

      // 判断文件大小，不能超过300M
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (!isLt300M) {
        this.uiHelper.msgTipWarning(`文件 ${file.name} 不能大于300M`);
        observer.complete();
        return;
      }

      observer.next(isLt300M);
      observer.complete();

      // check height
      /*this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });*/
    });
  }

  uploadFileHandleChange({ file, fileList }: UploadChangeParam): void {
    // debugger;
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      const response = file.response;
      if (!response) {
        this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
        return;
      }

      const success = response.success;
      const code = response.code;
      const msg = response.msg;
      if (success) {
        this.uiHelper.msgTipSuccess(`${file.name} 文件上传成功。`);
        return;
      } else {
        const b = this.httpUtils.dealError(code, msg);
        if (!b) {
          this.uiHelper.msgTipError(msg);
        }
      }
    } else if (status === 'error') {
      this.uiHelper.msgTipError(`${file.name} 文件上传失败`);
    }
  }

  resetConfigModal() {
    this.isShowConfigModal = false;
    this.isConfigOkLoading = false;
  }

  configHandleCancel() {
   this.resetConfigModal();
  }

  configHandleOk() {
    this.isConfigOkLoading = true;
  }

  selectStorageConfigType($event: any) {
    console.log($event);
  }
}
