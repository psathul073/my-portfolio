import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Icons from './Icons';
import { SendMail } from '../API/githubData';
import { motion as Motion } from 'motion/react';
import gsap from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();
    const [charLength, setCharLength] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const onSubmit = async (data) => {
        if (charLength <= 500) {
            setIsDisable(true);
            const response = await SendMail(data);
            if (response.success) {
                setIsDone(true);
            }
            setIsDisable(false);
            setCharLength(0);
            reset();
        }

    };

    const handleChange = useCallback((e) => {
        const message = e.target.value;
        setCharLength(message.length);
    }, []);

    useEffect(() => {
        gsap.from(".contact-content", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (

        <main>
            <section id='contact'>

                <div className='contact-content'>
                    <h2>Contact me<span>.</span></h2>
                    <p>I’m always looking to grow, learn, and connect with others in tech. Got feedback, a tip, or an opportunity? I’d love to hear from you.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">

                        <div className='name-email'>

                            <div className='name-container'>
                                <label htmlFor="name">Name<span>*</span></label>
                                <input id="name" {...register('name')} placeholder="Your Name" required />
                            </div>

                            <div className='email-container'>
                                <label htmlFor="email">Email<span>*</span></label>
                                <input id="email" {...register('email')} placeholder="d9@mail.com" type="email" required />
                            </div>

                        </div>

                        <div className='msg-container' >
                            <label htmlFor="message">Message<span>*</span></label>
                            <textarea onChangeCapture={handleChange} id="message" style={{ borderColor: charLength > 500 && '#dc2626' }} {...register('message')} placeholder="Your Message" required />
                            <p className='charLength' style={{ color: charLength > 500 && '#dc2626' }}>{charLength}/500 characters</p>
                        </div>

                        <button type="submit" className="sub-btn" disabled={isDisable}><Icons name={isDone ? 'done' : isDisable ? 'loading' : 'send'} className={'icon'} />Send</button>
                    </form>

                    <p>Or get in touch with me:</p>
                    <ul style={{ willChange: 'transform' }}>
                        <li><Link to={'mailto:psathul073@gmail.com'}><Icons name={'gmail'} />Email <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.instagram.com/d9.coder/'}><Icons name={'ig_c'} />Instagram <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.facebook.com/people/D9-Coder/61572788624684/'}><Icons name={'fb'} />Facebook <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                        <li><Link to={'https://www.linkedin.com/in/athul-fullstack'}><Icons name={'linkedin_c'} />Linkedin <Icons name={'arrowRight'} className={'icon'} /> </Link></li>
                    </ul>

                </div>

            </section>
        </main>

    )
};

export default Contact