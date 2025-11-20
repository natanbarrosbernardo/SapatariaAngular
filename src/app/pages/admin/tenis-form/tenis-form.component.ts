import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { ProductService } from '../../../services/product.service';
import { Tenis } from '../../../models/tenis.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-tenis-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,        
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './tenis-form.component.html',
  styleUrls: ['./tenis-form.component.css']
})
export class TenisFormComponent implements OnInit { 

  tenisForm: FormGroup;
  isEditMode = false; 
  tenisId: number | null = null;
  mensagemSucesso = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.tenisForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['masculino', Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      imagem: ['assets/img/default.jpg', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      
      if (id) {
        
        this.isEditMode = true;
        this.tenisId = +id; 

       
        this.productService.getTenisById(this.tenisId).subscribe(data => {
          this.tenisForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tenisForm.invalid) {
      return; 
    }

    const tenis: Tenis = { ...this.tenisForm.value }; 

    if (this.isEditMode && this.tenisId) {
      tenis.id = this.tenisId; 
      this.productService.updateTenis(tenis).subscribe(() => {
        this.mensagemSucesso = 'Ténis atualizado com sucesso!';
       
      });

    } else {
      this.productService.addTenis(tenis).subscribe(() => {
        this.mensagemSucesso = 'Ténis criado com sucesso!';
        this.tenisForm.reset({ 
          categoria: 'masculino', 
          imagem: 'assets/img/default.jpg' 
        });
      });
    }
  }
}