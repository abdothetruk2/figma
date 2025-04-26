import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { v4 as uuidv4 } from 'uuid';
import { ElementStyle } from '../../types';
import { Layout, Donut as ButtonIcon, CreditCard, FormInput } from 'lucide-react';

interface PresetComponent {
  name: string;
  style: ElementStyle;
  content?: string;
  children?: any[];
  category: 'navigation' | 'buttons' | 'cards' | 'forms' | 'bootstrap';
}

const presets: PresetComponent[] = [
  // Navigation Components
  {
    name: 'Modern Navbar',
    category: 'navigation',
    style: {
      width: 1200,
      height: 80,
      backgroundColor: '#ffffff',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -1,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 50,
      gradient: null,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: {
        top: 16,
        right: 24,
        bottom: 16,
        left: 24,
      },
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    children: [
      {
        id: uuidv4(),
        type: 'text',
        position: { x: 24, y: 28 },
        style: {
          width: 120,
          height: 24,
          backgroundColor: 'transparent',
          borderRadius: 0,
          boxShadow: {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            spreadRadius: 0,
            color: 'transparent',
            inset: false,
          },
          opacity: 1,
          transform: '',
          zIndex: 51,
          gradient: null,
          font: {
            family: 'Inter',
            size: 24,
            weight: 700,
            color: '#1a1a1a',
          },
          filter: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
          },
          backdropFilter: {
            blur: 0,
            brightness: 100,
          },
        },
        content: 'Logo',
      },
      {
        id: uuidv4(),
        type: 'container',
        position: { x: 600, y: 20 },
        style: {
          width: 500,
          height: 40,
          backgroundColor: 'transparent',
          borderRadius: 0,
          boxShadow: {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            spreadRadius: 0,
            color: 'transparent',
            inset: false,
          },
          opacity: 1,
          transform: '',
          zIndex: 51,
          gradient: null,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 32,
          filter: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
          },
          backdropFilter: {
            blur: 0,
            brightness: 100,
          },
        },
        children: [
          {
            id: uuidv4(),
            type: 'text',
            position: { x: 0, y: 8 },
            style: {
              width: 60,
              height: 24,
              backgroundColor: 'transparent',
              borderRadius: 0,
              boxShadow: {
                offsetX: 0,
                offsetY: 0,
                blurRadius: 0,
                spreadRadius: 0,
                color: 'transparent',
                inset: false,
              },
              opacity: 1,
              transform: '',
              zIndex: 52,
              gradient: null,
              font: {
                family: 'Inter',
                size: 16,
                weight: 500,
                color: '#4B5563',
              },
              filter: {
                blur: 0,
                brightness: 100,
                contrast: 100,
                saturate: 100,
              },
              backdropFilter: {
                blur: 0,
                brightness: 100,
              },
            },
            content: 'Home',
          },
          {
            id: uuidv4(),
            type: 'text',
            position: { x: 92, y: 8 },
            style: {
              width: 80,
              height: 24,
              backgroundColor: 'transparent',
              borderRadius: 0,
              boxShadow: {
                offsetX: 0,
                offsetY: 0,
                blurRadius: 0,
                spreadRadius: 0,
                color: 'transparent',
                inset: false,
              },
              opacity: 1,
              transform: '',
              zIndex: 52,
              gradient: null,
              font: {
                family: 'Inter',
                size: 16,
                weight: 500,
                color: '#4B5563',
              },
              filter: {
                blur: 0,
                brightness: 100,
                contrast: 100,
                saturate: 100,
              },
              backdropFilter: {
                blur: 0,
                brightness: 100,
              },
            },
            content: 'About',
          },
          {
            id: uuidv4(),
            type: 'text',
            position: { x: 204, y: 8 },
            style: {
              width: 80,
              height: 24,
              backgroundColor: 'transparent',
              borderRadius: 0,
              boxShadow: {
                offsetX: 0,
                offsetY: 0,
                blurRadius: 0,
                spreadRadius: 0,
                color: 'transparent',
                inset: false,
              },
              opacity: 1,
              transform: '',
              zIndex: 52,
              gradient: null,
              font: {
                family: 'Inter',
                size: 16,
                weight: 500,
                color: '#4B5563',
              },
              filter: {
                blur: 0,
                brightness: 100,
                contrast: 100,
                saturate: 100,
              },
              backdropFilter: {
                blur: 0,
                brightness: 100,
              },
            },
            content: 'Contact',
          },
          {
            id: uuidv4(),
            type: 'rectangle',
            position: { x: 316, y: 0 },
            style: {
              width: 120,
              height: 40,
              backgroundColor: '#3B82F6',
              borderRadius: 20,
              boxShadow: {
                offsetX: 0,
                offsetY: 2,
                blurRadius: 4,
                spreadRadius: 0,
                color: 'rgba(59, 130, 246, 0.1)',
                inset: false,
              },
              opacity: 1,
              transform: '',
              zIndex: 52,
              gradient: null,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              filter: {
                blur: 0,
                brightness: 100,
                contrast: 100,
                saturate: 100,
              },
              backdropFilter: {
                blur: 0,
                brightness: 100,
              },
            },
            content: '<div style="color: white; font-family: Inter; font-weight: 500; font-size: 16px;">Sign Up</div>',
          },
        ],
      },
    ],
  },
  // Bootstrap Components
  {
    name: 'Bootstrap Navbar',
    category: 'bootstrap',
    style: {
      width: 1200,
      height: 56,
      backgroundColor: '#f8f9fa',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 2,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.05)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1030,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" href="#">Brand</a>
          <button class="navbar-toggler">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search">
              <button class="btn btn-outline-success" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>
    `,
  },
  {
    name: 'Bootstrap Card',
    category: 'bootstrap',
    style: {
      width: 300,
      height: 400,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="card">
        <img src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Alert',
    category: 'bootstrap',
    style: {
      width: 500,
      height: 60,
      backgroundColor: '#cfe2ff',
      borderRadius: 4,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 1,
        color: '#9ec5fe',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
    `,
  },
  {
    name: 'Bootstrap Form',
    category: 'bootstrap',
    style: {
      width: 400,
      height: 300,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <form class="p-4">
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `,
  },
  // New Bootstrap Components
  {
    name: 'Bootstrap Button Group',
    category: 'bootstrap',
    style: {
      width: 300,
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 4,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary">Left</button>
        <button type="button" class="btn btn-primary">Middle</button>
        <button type="button" class="btn btn-primary">Right</button>
      </div>
    `,
  },
  {
    name: 'Bootstrap Accordion',
    category: 'bootstrap',
    style: {
      width: 500,
      height: 250,
      backgroundColor: '#ffffff',
      borderRadius: 4,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button">
              Accordion Item #1
            </button>
          </h2>
          <div class="accordion-collapse collapse show">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button">
              Accordion Item #2
            </button>
          </h2>
          <div class="accordion-collapse collapse">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default.
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Progress Bar',
    category: 'bootstrap',
    style: {
      width: 500,
      height: 60,
      backgroundColor: 'transparent',
      borderRadius: 4,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div>
        <h5>Basic Progress</h5>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
        </div>
        <br>
        <h5>Striped Progress</h5>
        <div class="progress">
          <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Modal',
    category: 'bootstrap',
    style: {
      width: 500,
      height: 300,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.2)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1050,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Carousel',
    category: 'bootstrap',
    style: {
      width: 600,
      height: 400,
      backgroundColor: '#000000',
      borderRadius: 8,
      boxShadow: {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 8,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.15)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" class="d-block w-100" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" class="d-block w-100" alt="Slide 2">
          </div>
        </div>
        <button class="carousel-control-prev" type="button">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    `,
  },
  {
    name: 'Bootstrap List Group',
    category: 'bootstrap',
    style: {
      width: 300,
      height: 220,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <ul class="list-group">
        <li class="list-group-item active" aria-current="true">An active item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    `,
  },
  {
    name: 'Bootstrap Badges',
    category: 'bootstrap',
    style: {
      width: 350,
      height: 100,
      backgroundColor: 'transparent',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="p-3">
        <h1>Example heading <span class="badge bg-secondary">New</span></h1>
        <div class="mt-3">
          <span class="badge bg-primary">Primary</span>
          <span class="badge bg-secondary">Secondary</span>
          <span class="badge bg-success">Success</span>
          <span class="badge bg-danger">Danger</span>
          <span class="badge bg-warning">Warning</span>
          <span class="badge bg-info">Info</span>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Spinners',
    category: 'bootstrap',
    style: {
      width: 300,
      height: 100,
      backgroundColor: 'transparent',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="d-flex flex-row gap-4 p-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    `,
  },
  {
    name: 'Bootstrap Toasts',
    category: 'bootstrap',
    style: {
      width: 350,
      height: 120,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 3,
        blurRadius: 10,
        spreadRadius: -3,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1080,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="toast show">
        <div class="toast-header">
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close"></button>
        </div>
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Pagination',
    category: 'bootstrap',
    style: {
      width: 350,
      height: 80,
      backgroundColor: 'transparent',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="p-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    `,
  },
  {
    name: 'Bootstrap Jumbotron',
    category: 'bootstrap',
    style: {
      width: 700,
      height: 300,
      backgroundColor: '#e9ecef',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="p-5 mb-4 rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Custom jumbotron</h1>
          <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap.</p>
          <button class="btn btn-primary btn-lg" type="button">Example button</button>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Buttons',
    category: 'bootstrap',
    style: {
      width: 400,
      height: 150,
      backgroundColor: 'transparent',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: 'transparent',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="p-3">
        <div class="d-flex gap-2 mb-2">
          <button type="button" class="btn btn-primary">Primary</button>
          <button type="button" class="btn btn-secondary">Secondary</button>
          <button type="button" class="btn btn-success">Success</button>
          <button type="button" class="btn btn-danger">Danger</button>
        </div>
        <div class="d-flex gap-2 mb-2">
          <button type="button" class="btn btn-outline-primary">Primary</button>
          <button type="button" class="btn btn-outline-secondary">Secondary</button>
          <button type="button" class="btn btn-outline-success">Success</button>
          <button type="button" class="btn btn-outline-danger">Danger</button>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-primary btn-lg">Large</button>
          <button type="button" class="btn btn-primary">Default</button>
          <button type="button" class="btn btn-primary btn-sm">Small</button>
        </div>
      </div>
    `,
  },
  {
    name: 'Bootstrap Dropdown',
    category: 'bootstrap',
    style: {
      width: 200,
      height: 200,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.15)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1000,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: `
      <div class="dropdown-menu d-block position-static pt-0 mx-0">
        <span class="d-block p-2 text-muted border-bottom">Dropdown header</span>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item active" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    `,
  },
  {
    name: 'Navbar',
    category: 'navigation',
    style: {
      width: 1200,
      height: 64,
      backgroundColor: '#ffffff',
      borderRadius: 0,
      boxShadow: {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 3,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 50,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Navigation',
  },
  {
    name: 'Sidebar',
    category: 'navigation',
    style: {
      width: 250,
      height: 600,
      backgroundColor: '#ffffff',
      borderRadius: 0,
      boxShadow: {
        offsetX: 1,
        offsetY: 0,
        blurRadius: 3,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 40,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
  },
  {
    name: 'Primary Button',
    category: 'buttons',
    style: {
      width: 120,
      height: 40,
      backgroundColor: '#3B82F6',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: 'rgba(59, 130, 246, 0.25)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Button',
  },
  {
    name: 'Secondary Button',
    category: 'buttons',
    style: {
      width: 120,
      height: 40,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 1,
        color: 'rgba(59, 130, 246, 0.5)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Button',
  },
  {
    name: 'Gradient Button',
    category: 'buttons',
    style: {
      width: 150,
      height: 45,
      backgroundColor: '#ffffff',
      borderRadius: 25,
      boxShadow: {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 12,
        spreadRadius: -2,
        color: 'rgba(0, 0, 0, 0.15)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: {
        type: 'linear',
        angle: 45,
        colors: ['#3B82F6', '#2DD4BF'],
      },
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Gradient',
  },
  {
    name: 'Basic Card',
    category: 'cards',
    style: {
      width: 300,
      height: 200,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      boxShadow: {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -1,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
  },
  {
    name: 'Hover Card',
    category: 'cards',
    style: {
      width: 300,
      height: 200,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      boxShadow: {
        offsetX: 0,
        offsetY: 8,
        blurRadius: 16,
        spreadRadius: -2,
        color: 'rgba(0, 0, 0, 0.15)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
  },
  {
    name: 'Input Field',
    category: 'forms',
    style: {
      width: 280,
      height: 40,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      boxShadow: {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 1,
        color: 'rgba(0, 0, 0, 0.1)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Input',
  },
  {
    name: 'Search Bar',
    category: 'forms',
    style: {
      width: 320,
      height: 44,
      backgroundColor: '#F3F4F6',
      borderRadius: 25,
      boxShadow: {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 2,
        spreadRadius: 0,
        color: 'rgba(0, 0, 0, 0.05)',
        inset: false,
      },
      opacity: 1,
      transform: '',
      zIndex: 1,
      gradient: null,
      filter: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturate: 100,
      },
      backdropFilter: {
        blur: 0,
        brightness: 100,
      },
    },
    content: 'Search...',
  },
];

const ComponentLibrary: React.FC = () => {
  const { dispatch } = useCanvas();
  const [activeCategory, setActiveCategory] = React.useState<PresetComponent['category']>('navigation');

  const handleAddComponent = (preset: PresetComponent) => {
    const generateElement = (base: any, parentId?: string) => {
      const element = {
        ...base,
        id: base.id || uuidv4(),
        parentId,
        children: base.children?.map(child => generateElement(child, base.id || uuidv4())),
      };
      return element;
    };

    const element = generateElement(preset);
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const categories = Array.from(new Set(presets.map(p => p.category)));
  const categoryIcons = {
    bootstrap: <Layout size={14} />,
    buttons: <ButtonIcon size={14} />,
    cards: <CreditCard size={14} />,
    forms: <FormInput size={14} />,
    navigation: <Layout size={14} />,
  };

  return (
    <div className="border-t border-gray-200 mt-4 pt-4">
      <h3 className="font-medium text-sm text-gray-700 mb-3">Component Library</h3>
      
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap flex items-center ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {categoryIcons[category] && <span className="mr-1.5">{categoryIcons[category]}</span>}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Component Grid */}
      <div className="grid grid-cols-2 gap-2">
        {presets
          .filter(preset => preset.category === activeCategory)
          .map((preset) => (
            <button
              key={preset.name}
              className="p-2 text-xs text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors duration-200"
              onClick={() => handleAddComponent(preset)}
            >
              <div className="font-medium mb-1">{preset.name}</div>
              <div 
                className="w-full h-12 rounded-sm border border-gray-200"
                style={{
                  background: preset.style.gradient 
                    ? `linear-gradient(${preset.style.gradient.angle}deg, ${preset.style.gradient.colors.join(', ')})`
                    : preset.style.backgroundColor,
                  borderRadius: `${preset.style.borderRadius}px`,
                  boxShadow: `${preset.style.boxShadow.offsetX}px ${preset.style.boxShadow.offsetY}px ${preset.style.boxShadow.blurRadius}px ${preset.style.boxShadow.spreadRadius}px ${preset.style.boxShadow.color}`,
                }}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;