import {
    Directive,
    Output,
    Input,
    EventEmitter,
    HostBinding,
    HostListener
  } from '@angular/core';
  
  @Directive({
    selector: '[appDnd]'
  })
  export class DndDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();
  
    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = true;
      console.log("from directive - Dragover listener");
    }
  
    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = false;
      console.log("from directive - Dragleave listener");
    }
  
    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.fileOver = false;
      let files = evt.dataTransfer.files;
      console.log("from directive -Drop listener");
      if (files.length > 0) {
        this.fileDropped.emit(files);
        console.log("from directive -Drop listener - emit files");
      }
    }
  }
  