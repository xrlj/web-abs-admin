import { Component, Output, EventEmitter } from '@angular/core';

export class AppBaseComponent {

  @Output() loading = new EventEmitter<boolean>();

  showLoading(isSpinning: boolean): void {
    this.loading.emit(isSpinning);
  }
}
