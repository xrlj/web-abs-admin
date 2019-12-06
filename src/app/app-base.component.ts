import { Component, Output, EventEmitter } from '@angular/core';

export class AppBaseComponent {

  @Output() loading = new EventEmitter<boolean>();

  // 发射事件给父组件
  showLoading(isSpinning: boolean): void {
    this.loading.emit(isSpinning);
  }
}
