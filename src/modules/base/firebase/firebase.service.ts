import * as admin from 'firebase-admin';
import { Inject, Injectable } from '@nestjs/common';
import { app as Firebase } from 'firebase-admin';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { FIREBASE_APP } from 'src/modules/base/firebase/firebase.const';
import { Logger } from 'winston';

@Injectable()
export class FirebaseService {
  private readonly messaging: admin.messaging.Messaging;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject(FIREBASE_APP)
    private readonly firebaseApp: Firebase.App,
  ) {
    this.messaging = this.firebaseApp.messaging();
  }
}
