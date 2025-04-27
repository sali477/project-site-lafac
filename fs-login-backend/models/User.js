const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  date_naissance: {
    type: Date,
    required: true
  },
  sexe: {
    type: String,
    enum: ["Homme", "Femme"],
    required: true
  },
  etablissement: {
    type: String,
    required: true
  },
  filiere: {
    type: String,
    required: true
  },
  type_utilisateur: {
    type: String,
    enum: ["etudiant", "enseignant"],
    required: true
  }
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Comparer le mot de passe
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

 
module.exports = mongoose.model("User", userSchema);
