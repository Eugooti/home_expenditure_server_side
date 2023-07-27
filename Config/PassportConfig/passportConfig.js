const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../Models/UsersModel');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return done(new Error('User not found'));
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'emailAddress',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { emailAddress: email } });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return done(null, false, { message: 'Invalid password' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
