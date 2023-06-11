import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class AppUserIcon {
  @Input()
  name: string = '';

  @Input()
  variant: 'dark' | 'light' = 'light';

  public getInitials() {
    const trimmedName = this.name.trim();
    const first = trimmedName[0].toUpperCase();
    const lastSpace = trimmedName.lastIndexOf(' ');
    const last = lastSpace === -1 ? '' : trimmedName[lastSpace + 1];
    return first + last;
  }

  public getClasses() {
    return this.variant === 'light'
      ? 'bg-light text-primary'
      : 'bg-primary text-light'
  }

}
