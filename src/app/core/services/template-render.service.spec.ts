import { TestBed } from '@angular/core/testing';

import { TemplateRenderService } from './template-render.service';

describe('TemplateRenderService', () => {
  let service: TemplateRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
