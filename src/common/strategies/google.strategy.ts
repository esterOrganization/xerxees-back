import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleStrategyResultInterface } from '../interfaces/google-startegy-result.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID  as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ['email', 'profile'],
      passReqToCallback:false,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any, // Now this will be properly populated
    done: VerifyCallback,
  ): Promise<any> {
    try {
      console.log("------------ Full Profile -------");
      console.log(profile);
      
      if (!profile) {
        throw new Error('No profile received from Google');
      }

      const { name, emails, photos } = profile;
      
      if (!emails || !emails.length) {
        throw new Error('No email provided by Google');
      }

      const user:GoogleStrategyResultInterface = {
        email: emails[0].value,
        firstName: name?.givenName || '',
        lastName: name?.familyName || '',
        picture: photos?.[0]?.value || '',
        accessToken,
        refreshToken,
      };

      console.log("Processed User:", user);
      done(null, user);
    } catch (err) {
      console.error("Google Strategy Error:", err);
      done(err, false);
    }
  }
}