<script lang="ts">
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let success = false;

  async function handleSubmit() {
    if (password !== confirmPassword) {
      error = "Les mots de passe ne correspondent pas.";
      return;
    }

    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      error = data.error || "Erreur lors de l'inscription.";
    } else {
      success = true;
      error = '';
    }
  }
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
  <h1 class="text-2xl mb-4">Créer un compte</h1>
  <form on:submit|preventDefault={handleSubmit} class="flex flex-col w-64 gap-2">
    <input type="email" placeholder="Email" bind:value={email} required />
    <input type="password" placeholder="Mot de passe" bind:value={password} required />
    <input type="password" placeholder="Confirmer le mot de passe" bind:value={confirmPassword} required />
    
    {#if error}
      <p class="text-red-600 text-sm">{error}</p>
    {/if}
    {#if success}
      <p class="text-green-600 text-sm">Inscription réussie !</p>
    {/if}
    
    <button type="submit" class="bg-blue-600 text-white py-2 rounded">S'inscrire</button>
  </form>
</main>
