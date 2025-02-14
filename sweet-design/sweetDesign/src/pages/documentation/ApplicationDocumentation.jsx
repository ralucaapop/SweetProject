import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationDocumentation = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '18px', position: 'relative' }}>
            <button
                onClick={goToProfile}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#fae7fd',
                    color: '#ebaa6c',
                    width: '100px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#fad7d4';
                    e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#fae7fd';
                    e.target.style.color = '#ebaa6c';
                }}
            >
                Înapoi
            </button>

            <h1>Cuprins pentru aplicație</h1>

            <ol>
                <li><a href="#rezumat" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Rezumat</a></li>
                <li><a href="#introducere" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Introducere</a></li>
                <li><a href="#structura" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Structură</a>
                    <ul>
                        <li><a href="#organizare-componentelor" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Organizarea componentelor și a folderelor</a></li>
                        <li><a href="#roluri-folder" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Explicarea rolurilor fiecărui folder (ex: `components`, `pages`, `utils`)</a></li>
                    </ul>
                </li>
                <li><a href="#elemente-baza" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Elemente de bază ale aplicației</a>
                    <ul>
                        <li><a href="#navigare" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Navigare și structura principală</a></li>
                        <li><a href="#functionalitati" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Funcționalități principale</a></li>
                        <li><a href="#vizuale" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Elemente vizuale</a></li>
                    </ul>
                </li>
                <li><a href="#interactiuni" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Interacțiuni și API</a></li>
                <li><a href="#validare" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Validare și autentificare</a></li>
                <li><a href="#suport" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Suport pentru utilizator</a></li>
                <li><a href="#concluzii" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>Concluzii</a></li>
            </ol>

            <h2 id="rezumat">1. Rezumat</h2>
            <p>Aplicația este destinată gestionării comenzilor și interacțiunii utilizatorilor cu un sistem de tip e-commerce specializat în produse de panificație și dulciuri. Funcționalitățile includ autentificare, înregistrare, gestionare produse, precomenzi și suport pentru utilizatori.</p>
            <p>Acest document oferă detalii despre structura aplicației, funcționalități cheie, interacțiuni cu API-ul și suportul oferit utilizatorilor pentru a facilita utilizarea acesteia.</p>

            <h2 id="introducere">2. Introducere</h2>
            <p>Aplicația Sweet Serenity combină funcționalitățile unui magazin online cu personalizarea experienței utilizatorului. Cu un design prietenos și utilizarea componentelor React moderne, aplicația permite o navigare simplă și interacțiuni rapide.</p>
            <p>Proiectul a fost dezvoltat folosind tehnologii moderne precum React, Node.js și o bază de date NoSQL, având ca scop principal eficientizarea procesului de comandă online și îmbunătățirea experienței utilizatorilor.</p>

            <h2 id="structura">3. Structură</h2>
            <h3 id="organizare-componentelor">3.1 Organizarea componentelor și a folderelor</h3>
            <p>Proiectul este organizat în următoarele directoare principale:</p>
            <ul>
                <li><strong>components</strong>: Conține componente reutilizabile precum `Navbar`, `ProductCard`, `DescriptionCard`.</li>
                <li><strong>pages</strong>: Include paginile aplicației (ex: `Home`, `Shop`, `Preorder`).</li>
                <li><strong>utils</strong>: Funcții auxiliare precum validarea JWT, manipularea datelor utilizatorilor.</li>
                <li><strong>services</strong>: Funcții pentru interacțiunea cu API-ul backend.</li>
                <li><strong>styles</strong>: Fișiere CSS care definesc stilurile aplicației.</li>
            </ul>

            <h3 id="roluri-folder">3.2 Explicarea rolurilor fiecărui folder</h3>
            <p>Fiecare folder are un scop bine definit, contribuind la separarea logicii aplicației:</p>
            <ul>
                <li><strong>components</strong>: Elemente vizuale reutilizabile și independente.</li>
                <li><strong>pages</strong>: Structuri specifice pentru fiecare pagină din aplicație.</li>
                <li><strong>utils</strong>: Funcții auxiliare pentru manipularea datelor și configurări globale.</li>
                <li><strong>services</strong>: Implementarea apelurilor către backend.</li>
            </ul>

            <h2 id="elemente-baza">4. Elemente de bază ale aplicației</h2>
            <h3 id="navigare">4.1 Navigare și structura principală</h3>
            <p>Componentele de navigare, cum ar fi `Navbar`, permit utilizatorilor să acceseze rapid secțiunile aplicației. Folosind `React Router`, navigarea este fluidă și eficientă.</p>
            <p>`Navbar` include linkuri către paginile principale, iar starea activă este evidențiată pentru o mai bună orientare.</p>

            <h3 id="functionalitati">4.2 Funcționalități principale</h3>
            <p>Fluxul principal include:</p>
            <ul>
                <li>Autentificare: Utilizatorii se pot înregistra, conecta și reseta parolele.</li>
                <li>Gestionare produse: Vizualizarea produselor, adăugarea în coș și precomenzi.</li>
                <li>Gestionare comenzi: Administrarea comenzilor prin funcționalități backend integrate.</li>
            </ul>

            <h3 id="vizuale">4.3 Elemente vizuale</h3>
            <p>Componente precum `ProductCard` și `DescriptionCard` sunt folosite pentru afișarea produselor și detalii. Stilurile CSS personalizate asigură un design plăcut vizual și adaptabil.</p>

            <h2 id="interactiuni">5. Interacțiuni și API</h2>
            <p>Aplicația utilizează biblioteca `axios` pentru cereri HTTP către API-ul backend. Exemple de endpoint-uri:</p>
            <ul>
                <li><strong>GET</strong> `/api/in/products/getProducts`: Obține lista produselor disponibile.</li>
                <li><strong>POST</strong> `/api/auth/register`: Înregistrează un utilizator nou.</li>
                <li><strong>PUT</strong> `/api/in/user/cart/updateProductQuantity`: Actualizează cantitatea produselor din coș.</li>
            </ul>
            <p>Aplicația implementează o structură RESTful pentru interacțiunile cu serverul, asigurând performanță și scalabilitate.</p>

            <h2 id="validare">6. Validare și autentificare</h2>
            <p>Utilizatorii trebuie să se autentifice pentru a accesa funcționalități precum plasarea comenzilor. Token-urile JWT sunt utilizate pentru securitate, iar parolele sunt validate înainte de trimiterea datelor la server.</p>
            <p>Sistemul de autentificare asigură protecția datelor utilizatorilor prin criptarea parolelor și verificarea periodică a autenticității tokenurilor.</p>

            <h2 id="suport">7. Suport pentru utilizator</h2>
            <p>Aplicația include funcționalități precum resetarea parolelor prin email, mesaje de eroare și succes pentru interacțiuni clare, și ghiduri intuitive pentru utilizatori.</p>
            <p>Suportul este disponibil printr-un formular de contact, iar utilizatorii pot primi răspunsuri în timp util de la echipa tehnică.</p>

            <h2 id="concluzii">8. Concluzii</h2>
            <p>Sweet Serenity oferă o soluție completă pentru un magazin online modern, cu funcționalități avansate pentru utilizatori și administratori.</p>
            <p>Prin integrarea tehnologiilor moderne, aplicația se adaptează nevoilor pieței și oferă o experiență plăcută tuturor utilizatorilor.</p>
        </div>
    );
};

export default ApplicationDocumentation;
