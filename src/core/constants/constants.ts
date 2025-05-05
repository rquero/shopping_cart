export class Constant {

  // Application Constants
  static appName: string = 'Vuetify Shopping Cart';
  static appVersion: string = '1.0.0';
  static appDescription: string = 'A simple shopping cart application built with Vuetify.';

  // Environment Constants
  static apiBaseUrl: string = 'https://api.example.com/v1';
  static apiKey: string = 'YOUR_API_KEY';
  static apiSecret: string = 'YOUR_API_SECRET';
  static apiToken: string = 'YOUR_API_TOKEN';
  static apiTokenExpiration: string = 'YOUR_API_TOKEN_EXPIRATION';
  static apiTokenType: string = 'Bearer';
  static apiTokenPrefix: string = 'Bearer ';
  static apiTokenHeader: string = 'Authorization';
  static apiContentType: string = 'application/json';
  static apiAccept: string = 'application/json';

  // Authentication Constants
  static loginAlertSuccess: string = 'Login successful';
  static loginAlertError: string = 'Login failed';
  static loginAlertInvalidCredentials: string = 'Invalid credentials';
  static registerAlertError: string = 'Registration failed';
  static registerAlertSuccess: string = 'Registration successful';
  static registerAlertEmailExists: string = 'Email already exists';
  static registerAlertInvalidEmail: string = 'Invalid email address';
  static registerAlertPasswordMismatch: string = 'Passwords do not match';
  static registerAlertWeakPassword: string = 'Password is too weak';
  static registerAlertInvalidName: string = 'Invalid name';
  static loginAlertTextSuccess: string = 'Welcome back!';
  static loginAlertTextError: string = 'Please try again.';
}